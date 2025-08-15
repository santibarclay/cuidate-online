'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, AlertTriangle, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import { UserPreferences } from '@/lib/gamification';

interface PasswordBreachCheckerProps {
  userPreferences: UserPreferences;
  onComplete: (score?: number) => void;
}

interface BreachResult {
  password: string;
  partialPassword: string;
  source: string;
}

export function PasswordBreachChecker({ userPreferences, onComplete }: PasswordBreachCheckerProps) {
  const [step, setStep] = useState<'intro' | 'checking' | 'results'>('intro');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [breaches, setBreaches] = useState<BreachResult[]>([]);
  const [error, setError] = useState('');

  const isGmailUser = userPreferences.email === 'gmail';

  const handleGooglePasswordCheckup = () => {
    // Open Google Password Checkup in new tab
    window.open('https://passwords.google.com/checkup/start', '_blank');
    setStep('results');
  };

  const handleComplete = () => {
    onComplete(100);
  };

  const handleEmailCheck = async () => {
    if (!email.trim()) {
      setError('Por favor ingresá tu email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor ingresá un email válido');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Extract username from email (part before @)
      const username = email.split('@')[0];
      
      // Call the ProxyNova API
      const response = await fetch(`https://api.proxynova.com/comb?query=${username}&start=0&limit=15`);
      
      if (!response.ok) {
        throw new Error('Error al verificar contraseñas');
      }
      
      const data = await response.json();
      
      if (data && data.lines && Array.isArray(data.lines)) {
        // Process the results to show partial passwords
        const processedBreaches = data.lines.map((line: any) => {
          const password = line.password || '';
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
            source: line.source || 'Base de datos comprometida'
          };
        }).filter((breach: BreachResult) => breach.password.length > 0);
        
        setBreaches(processedBreaches);
      } else {
        setBreaches([]);
      }
      
      setStep('results');
    } catch (err) {
      console.error('Error checking breaches:', err);
      // Don't expose the actual error, show generic message
      setError('No pudimos verificar tus contraseñas en este momento. Esto no significa que estés seguro. Te recomendamos usar contraseñas únicas y seguras para cada cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderIntroStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🔐</div>
        <h3 className="text-xl font-semibold mb-2">Verificación de contraseñas</h3>
        <p className="text-gray-600">
          Vamos a verificar si alguna de tus contraseñas fue comprometida en brechas de datos
        </p>
      </div>
      
      {isGmailUser ? (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Para usuarios de Gmail</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Como usás Gmail, podés usar la herramienta oficial de Google que verificará automáticamente 
              todas las contraseñas que tenés guardadas en tu navegador.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-800 text-sm font-medium">
                📋 Recordatorio: Al terminar la revisión de contraseñas en Google, volvé a esta pestaña de Cuidate Online para continuar con la misión.
              </p>
            </div>
            
            <Button 
              onClick={handleGooglePasswordCheckup}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Abrir Google Password Checkup
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Te dirigirá a passwords.google.com/checkup/start
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Verificación por email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresá tu email para verificar
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-security-blue focus:border-transparent"
                  placeholder="tu.email@ejemplo.com"
                />
                {error && (
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                )}
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-800 mb-2">🔒 Tu privacidad está protegida</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Esta verificación es anónima</li>
                  <li>• No guardamos tu email ni contraseñas</li>
                  <li>• Solo mostramos resultados parcialmente ocultos</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleEmailCheck}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  'Verificar contraseñas'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderResultsStep = () => (
    <div className="space-y-6">
      {isGmailUser ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Revisá tus resultados en Google</h3>
            <p className="text-gray-600">
              Google te mostrará si encontró contraseñas hackeadas en tu navegador
            </p>
          </div>
          
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg text-orange-800">¿Qué hacer con los resultados?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-orange-700">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Si Google encontró contraseñas hackeadas:</p>
                    <p className="text-sm">Cambiá inmediatamente esas contraseñas. Google te mostrará en qué sitios las usás.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Si no encontró problemas:</p>
                    <p className="text-sm">¡Excelente! Cuando llegues a nivel 3 aprenderás algo más. Por ahora estas son super buenas noticias!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {breaches.length > 0 ? '⚠️' : '✅'}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {breaches.length > 0 
                ? `Encontramos ${breaches.length} contraseña${breaches.length > 1 ? 's' : ''} comprometida${breaches.length > 1 ? 's' : ''}` 
                : 'No encontramos contraseñas comprometidas'
              }
            </h3>
          </div>
          
          {breaches.length > 0 ? (
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-lg text-red-800 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Contraseñas encontradas en brechas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {breaches.map((breach, index) => (
                    <div key={index} className="bg-white p-3 rounded border border-red-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-mono text-lg font-bold text-red-600">
                            {breach.partialPassword}
                          </p>
                          <p className="text-sm text-gray-600">
                            Fuente: {breach.source}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">⚡ Acción inmediata requerida</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Si reconocés alguna de estas contraseñas, <strong>cambiala YA</strong></li>
                      <li>• Cambiala en TODOS los sitios donde la uses</li>
                      <li>• Creá una contraseña única y diferente para cada cuenta</li>
                      <li>• Nunca más reutilices contraseñas</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>¡Excelente!</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-green-700">
                  <p>
                    ¡Excelente! Cuando llegues a nivel 3 aprenderás algo más. Por ahora estas son super buenas noticias!
                  </p>
                  
                  <div className="bg-white p-3 rounded border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Recordatorios importantes:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Seguí usando contraseñas únicas para cada cuenta</li>
                      <li>• Las brechas nuevas ocurren todo el tiempo</li>
                      <li>• Mantené tus contraseñas seguras</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
      
      <div className="text-center">
        <Button 
          onClick={handleComplete}
          className="bg-security-green hover:bg-green-700"
        >
          ¡Entendido, continuar!
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        {step === 'intro' && renderIntroStep()}
        {step === 'results' && renderResultsStep()}
      </CardContent>
    </Card>
  );
}