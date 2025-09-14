'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Mail, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  Lock,
  Calendar,
  Users,
  Database,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';

interface HIBPBreach {
  name: string;
  title: string;
  domain: string;
  breachDate: string;
  addedDate: string;
  modifiedDate: string;
  pwnCount: number;
  description: string;
  logoPath?: string;
  dataClasses: string[];
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
  isRetired: boolean;
  isSpamList: boolean;
}

interface ProxyNovaBreach {
  password: string;
  partialPassword: string;
  source: string;
}

type BreachResult = HIBPBreach | ProxyNovaBreach;

interface APIResponse {
  breaches: BreachResult[];
  source: 'hibp' | 'proxynova';
  error?: string;
}

export default function BreachCheckerPage() {
  const [step, setStep] = useState<'auth' | 'search' | 'results'>('auth');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<APIResponse | null>(null);
  const [error, setError] = useState('');
  const [authError, setAuthError] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState<Set<number>>(new Set());
  const [expandedBreaches, setExpandedBreaches] = useState<Set<number>>(new Set());
  // Check if we're in production (HIBP available) or development (ProxyNova only)
  const isProduction = process.env.NODE_ENV === 'production';
  const [selectedProvider, setSelectedProvider] = useState<'hibp' | 'proxynova'>(
    isProduction ? 'hibp' : 'proxynova'
  );

  const handleAuthenticate = async () => {
    if (!password.trim()) {
      setAuthError('Ingresá la contraseña');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    try {
      // Check password against environment variable
      const response = await fetch('/api/hibp-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setStep('search');
      } else {
        setAuthError('Contraseña incorrecta');
      }
    } catch (err) {
      setAuthError('Error de autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!email.trim()) {
      setError('Ingresá tu email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresá un email válido');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/hibp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          forceProvider: selectedProvider === 'proxynova' ? 'proxynova' : undefined 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error al verificar el email');
        return;
      }

      setResults(data);
      setStep('results');
      
      // Scroll to top to show results from the beginning
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Search error:', err);
      setError('Error al conectar con el servicio');
    } finally {
      setIsLoading(false);
    }
  };

  const isHIBPBreach = (breach: BreachResult): breach is HIBPBreach => {
    return 'name' in breach && 'title' in breach;
  };

  const stripHtmlTags = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  };

  const togglePasswordVisibility = (index: number) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(index)) {
      newVisible.delete(index);
    } else {
      newVisible.add(index);
    }
    setVisiblePasswords(newVisible);
  };

  const toggleBreachExpansion = (index: number) => {
    const newExpanded = new Set(expandedBreaches);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedBreaches(newExpanded);
  };

  const renderAuthStep = () => (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <CardTitle className="text-2xl">Verificador de Brechas</CardTitle>
          <p className="text-gray-600">
            Página restringida - Solicitá la contraseña a Santiago
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="auth-password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña de acceso
              </label>
              <input
                type="password"
                id="auth-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) setAuthError('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-security-blue focus:border-transparent"
                placeholder="Contraseña"
                onKeyPress={(e) => e.key === 'Enter' && handleAuthenticate()}
              />
              {authError && (
                <p className="text-red-600 text-sm mt-1">{authError}</p>
              )}
            </div>
            
            <Button 
              onClick={handleAuthenticate}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Acceder
                </>
              )}
            </Button>
            
            <div className="text-center">
              <Link href="/" className="text-security-blue hover:underline text-sm">
                Volver al inicio
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSearchStep = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">
            Verificá si tu email apareció en alguna brecha de datos conocida
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email a verificar
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
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Seleccionar proveedor de datos
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={selectedProvider === 'hibp' ? 'primary' : 'outline'}
                    onClick={() => setSelectedProvider('hibp')}
                    disabled={!isProduction}
                    className="flex flex-col h-auto p-4"
                  >
                    <div className="text-sm font-semibold" translate="no">Have I Been Pwned</div>
                    <div className="text-xs mt-1">Base de datos completa</div>
                    {!isProduction && (
                      <div className="text-xs text-gray-500 mt-1">(Solo en producción)</div>
                    )}
                  </Button>
                  <Button
                    variant={selectedProvider === 'proxynova' ? 'primary' : 'outline'}
                    onClick={() => setSelectedProvider('proxynova')}
                    className="flex flex-col h-auto p-4"
                  >
                    <div className="text-sm font-semibold">ProxyNova</div>
                    <div className="text-xs mt-1">Base de datos básica</div>
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">🔒 Privacidad</h4>
                <div className="text-sm text-blue-700">
                  <p>Este email será enviado a un proveedor externo en el que confío ({selectedProvider === 'hibp' ? <span translate="no">Have I Been Pwned</span> : 'ProxyNova'}), pero podés leer su <a href={selectedProvider === 'hibp' ? 'https://haveibeenpwned.com/Privacy' : '#'} target="_blank" className="underline">política de privacidad</a>.</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Verificar Email
                </>
              )}
            </Button>
            
            <div className="text-center">
              <Link href="/" className="text-security-blue hover:underline text-sm">
                Volver al inicio
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderResultsStep = () => {
    if (!results) return null;

    const breaches = results.breaches;
    const isHIBP = results.source === 'hibp';
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {breaches.length > 0 ? '⚠️' : '✅'}
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {breaches.length > 0 
              ? `Tu email apareció en ${breaches.length} brecha${breaches.length > 1 ? 's' : ''}`
              : 'No se encontraron brechas'
            }
          </h1>
          <p className="text-gray-600">
            {isHIBP 
              ? <span translate="no">Resultados de Have I Been Pwned</span>
              : 'Resultados de ProxyNova'}
          </p>
        </div>

        {breaches.length > 0 ? (
          <div className="space-y-6">
            {breaches.map((breach, index) => (
              <Card key={index} className="bg-red-50 border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-800 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span translate={isHIBPBreach(breach) ? 'yes' : 'no'}>
                      {isHIBPBreach(breach) ? breach.title : 'Contraseña Expuesta'}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isHIBPBreach(breach) ? (
                    <div className="space-y-4">
                      {/* Información básica - siempre visible */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-red-600" />
                          <span className="font-medium">Fecha de la brecha:</span>
                          <span>{new Date(breach.breachDate).toLocaleDateString('es-AR')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-red-600" />
                          <span className="font-medium">Cuentas afectadas:</span>
                          <span>{breach.pwnCount.toLocaleString('es-AR')}</span>
                        </div>
                        {breach.domain && (
                          <div className="flex items-center space-x-2">
                            <ExternalLink className="h-4 w-4 text-red-600" />
                            <span className="font-medium">Sitio:</span>
                            <span>{breach.domain}</span>
                          </div>
                        )}
                      </div>

                      {/* Botón Ver más */}
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleBreachExpansion(index)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {expandedBreaches.has(index) ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Ver menos
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Ver más
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Información detallada - solo visible cuando está expandido */}
                      {expandedBreaches.has(index) && (
                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <Database className="h-4 w-4 text-red-600 mt-1" />
                            <div>
                              <span className="font-medium">Datos comprometidos:</span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {breach.dataClasses.map((dataClass, i) => (
                                  <span key={i} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded" translate="yes">
                                    {dataClass}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded border border-red-200">
                            <h4 className="font-medium text-gray-800 mb-2">Descripción de la brecha:</h4>
                            <p className="text-sm text-gray-700" translate="yes">{stripHtmlTags(breach.description)}</p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded border border-gray-200">
                            <div className="text-xs text-gray-600 space-y-1">
                              <div className="flex justify-between">
                                <span>Agregado a HIBP:</span>
                                <span>{new Date(breach.addedDate).toLocaleDateString('es-AR')}</span>
                              </div>
                              {breach.modifiedDate && (
                                <div className="flex justify-between">
                                  <span>Última modificación:</span>
                                  <span>{new Date(breach.modifiedDate).toLocaleDateString('es-AR')}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span>Estado de verificación:</span>
                                <span className={breach.isVerified ? 'text-green-600' : 'text-yellow-600'}>
                                  {breach.isVerified ? 'Verificado' : 'No verificado'}
                                </span>
                              </div>
                              {breach.isSensitive && (
                                <div className="flex justify-between">
                                  <span>Brecha sensible:</span>
                                  <span className="text-red-600">Sí</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {!breach.isVerified && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                              <p className="text-yellow-800 text-sm">
                                ⚠️ Esta brecha no ha sido verificada completamente
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="bg-white p-3 rounded border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-mono text-lg font-bold text-red-600">
                            {visiblePasswords.has(index) 
                              ? (breach as ProxyNovaBreach).password 
                              : (breach as ProxyNovaBreach).partialPassword}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => togglePasswordVisibility(index)}
                            className="ml-2"
                          >
                            {visiblePasswords.has(index) ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-1" />
                                Ocultar
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-1" />
                                Mostrar
                              </>
                            )}
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Fuente: {(breach as ProxyNovaBreach).source}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">🚨 Qué hacer ahora</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-orange-700">
                  <li>• <strong>Pensá qué contraseña usaste en este o estos sitios</strong>, y cambiala en todos los lugares donde la estés usando, y no la uses más</li>
                  <li>• Activá la autenticación de dos factores donde sea posible (misión disponible en la plataforma)</li>
                  <li>• Considerá usar un administrador de contraseñas (próximamente será una misión disponible)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>¡Excelente!</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-green-700">
                <p>
                  Tu email no apareció en ninguna brecha de datos conocida. 
                  Esto es una excelente noticia, pero recordá que siempre es importante mantener buenas prácticas de seguridad.
                </p>
                
                <div className="bg-white p-3 rounded border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Mantené tu seguridad:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Usá contraseñas únicas y seguras</li>
                    <li>• Activá la autenticación de dos factores</li>
                    <li>• Mantené tus aplicaciones actualizadas</li>
                    <li>• Revisá periódicamente tu seguridad</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="text-center mt-8 space-x-4">
          <Button onClick={() => { 
            setStep('search'); 
            setEmail(''); 
            setResults(null); 
            setVisiblePasswords(new Set());
            setExpandedBreaches(new Set());
          }}>
            Verificar otro email
          </Button>
          <Link href="/" className="text-security-blue hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-security-blue" />
            <h1 className="text-3xl font-bold text-gray-900">Verificador de Brechas</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {step === 'auth' && renderAuthStep()}
        {step === 'search' && renderSearchStep()}
        {step === 'results' && renderResultsStep()}
      </div>
    </div>
  );
}