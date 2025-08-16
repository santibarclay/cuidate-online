import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const { email, forceProvider } = await request.json();
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Rate limiting - only apply to HIBP requests (not ProxyNova)
    const willUseHIBP = (process.env.NODE_ENV === 'production' && forceProvider !== 'proxynova') || forceProvider === 'hibp';
    let rateLimitResult = null;
    
    if (willUseHIBP) {
      rateLimitResult = await checkRateLimit(request);
      
      if (!rateLimitResult.allowed) {
        const headers = getRateLimitHeaders(rateLimitResult);
        return NextResponse.json(
          { error: rateLimitResult.error },
          { 
            status: 429, 
            headers 
          }
        );
      }
      
      console.log('Rate limit passed. Remaining requests:', rateLimitResult.remaining);
    }

    // Check environment - use HIBP only in production unless forced to use ProxyNova
    const isProduction = process.env.NODE_ENV === 'production';
    const hibpApiKey = process.env.HIBP_API_KEY;
    const useProxyNova = forceProvider === 'proxynova';
    
    console.log('Environment check:', { 
      NODE_ENV: process.env.NODE_ENV, 
      isProduction, 
      hasHIBPKey: !!hibpApiKey,
      forceProvider,
      useProxyNova
    });

    if (isProduction && !hibpApiKey && !useProxyNova) {
      console.error('HIBP_API_KEY not found in production environment');
      return NextResponse.json(
        { error: 'Servicio no disponible' },
        { status: 500 }
      );
    }

    if (isProduction && !useProxyNova) {
      // Use HIBP API in production
      try {
        const hibpResponse = await fetch(
          `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
          {
            method: 'GET',
            headers: {
              'hibp-api-key': hibpApiKey!,
              'User-Agent': 'Cuidate-Online-Security-Platform'
            }
          }
        );

        if (hibpResponse.status === 404) {
          // No breaches found
          return NextResponse.json({ breaches: [] });
        }

        if (hibpResponse.status === 429) {
          return NextResponse.json(
            { error: 'Demasiadas consultas. Intentá en unos minutos.' },
            { status: 429 }
          );
        }

        if (!hibpResponse.ok) {
          console.error('HIBP API error:', hibpResponse.status, hibpResponse.statusText);
          return NextResponse.json(
            { error: 'Error al consultar la base de datos de brechas' },
            { status: 500 }
          );
        }

        const breachData = await hibpResponse.json();
        
        // Transform HIBP data to our format
        const transformedBreaches = breachData.map((breach: any) => ({
          name: breach.Name,
          title: breach.Title,
          domain: breach.Domain,
          breachDate: breach.BreachDate,
          addedDate: breach.AddedDate,
          modifiedDate: breach.ModifiedDate,
          pwnCount: breach.PwnCount,
          description: breach.Description,
          logoPath: breach.LogoPath,
          dataClasses: breach.DataClasses,
          isVerified: breach.IsVerified,
          isFabricated: breach.IsFabricated,
          isSensitive: breach.IsSensitive,
          isRetired: breach.IsRetired,
          isSpamList: breach.IsSpamList
        }));

        const response = NextResponse.json({ 
          breaches: transformedBreaches,
          source: 'hibp'
        });

        // Add rate limit headers if HIBP was used
        if (willUseHIBP && rateLimitResult) {
          const headers = getRateLimitHeaders(rateLimitResult);
          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        }

        return response;

      } catch (error) {
        console.error('HIBP API call failed:', error);
        return NextResponse.json(
          { error: 'Error al conectar con el servicio de verificación' },
          { status: 500 }
        );
      }
    } else {
      // Use ProxyNova in development/local
      console.log('Using ProxyNova for development/local');
      try {
        const username = email.split('@')[0];
        console.log('Calling ProxyNova with username:', username);
        const response = await fetch(
          `https://api.proxynova.com/comb?query=${username}&start=0&limit=15`
        );

        if (!response.ok) {
          console.error('ProxyNova API error:', response.status, response.statusText);
          throw new Error('ProxyNova API error');
        }

        const data = await response.json();
        console.log('ProxyNova response:', data);
        
        if (data && data.lines && Array.isArray(data.lines)) {
          const processedBreaches = data.lines
            .map((line: any) => {
              // ProxyNova returns strings in format "email:password"
              let password = '';
              let source = 'Base de datos expuesta';
              
              if (typeof line === 'string') {
                const parts = line.split(':');
                if (parts.length > 1) {
                  password = parts[1] || '';
                }
              } else if (line.password) {
                password = line.password;
                source = line.source || source;
              }
              
              let partialPassword = '';
              if (password.length > 0) {
                if (password.length <= 3) {
                  partialPassword = password.charAt(0) + '*'.repeat(password.length - 1);
                } else {
                  partialPassword = password.charAt(0) + '*'.repeat(Math.min(password.length - 2, 8)) + (password.length > 1 ? password.charAt(password.length - 1) : '');
                }
              }
              
              return {
                password: password,
                partialPassword: partialPassword,
                source: source
              };
            })
            .filter((breach: any) => breach.password.length > 0);

          return NextResponse.json({ 
            breaches: processedBreaches,
            source: 'proxynova'
          });
        } else {
          return NextResponse.json({ 
            breaches: [],
            source: 'proxynova'
          });
        }
      } catch (error) {
        console.error('ProxyNova API call failed:', error);
        return NextResponse.json(
          { error: 'No pudimos verificar tu email en este momento. Esto no significa que estés seguro.' },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}