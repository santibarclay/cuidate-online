import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { 
  ArrowLeft, 
  ExternalLink, 
  Shield, 
  Heart,
  Target,
  BookOpen
} from 'lucide-react';
import { SITE_NAME, CREATOR } from '@/lib/constants';
import { MISSIONS } from '@/lib/missions-data';

export default function AboutPage() {
  // Calculate stats dynamically from MISSIONS
  const totalMissions = MISSIONS.length;
  const totalConcepts = MISSIONS.reduce((sum, mission) => sum + mission.securityConcepts.length, 0);
  const totalHours = MISSIONS.reduce((sum, mission) => {
    const time = parseFloat(mission.estimatedTime);
    return sum + (isNaN(time) ? 0 : time);
  }, 0);
  
  const stats = [
    { label: "Misiones educativas", value: totalMissions.toString(), icon: BookOpen },
    { label: "Conceptos de seguridad", value: totalConcepts.toString(), icon: Shield },
    { label: "Horas de contenido", value: totalHours.toFixed(1), icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-security-blue hover:text-blue-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-security-blue" />
            <h1 className="text-3xl font-bold text-gray-900">Sobre {SITE_NAME}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Santiago's Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Mi historia</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-security-blue/20 flex-shrink-0">
                <img 
                  src="/images/santiago-barclay.jpg"
                  alt="Santiago Barclay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{CREATOR.name}</h3>
                <p className="text-security-blue font-medium mb-4">{CREATOR.role}</p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {CREATOR.bio}
                </p>
                
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Mi experiencia trabajando con empresas de diferentes tamaños me mostró una realidad preocupante: 
                    la mayoría de los hackeos exitosos se deben a falta de conocimiento básico, no a sofisticación técnica.
                  </p>
                  <p className="text-gray-700">
                    En Argentina, veo constantemente familias que pierden dinero por phishing de Mercado Pago, 
                    cuentas de WhatsApp robadas, o passwords comprometidos. Todo esto es prevenible con educación práctica.
                  </p>
                  <p className="text-gray-700">
                    Por eso creé {SITE_NAME}: para democratizar el conocimiento de ciberseguridad y que cualquier persona, 
                    sin importar su nivel técnico, pueda proteger su vida digital paso a paso.
                  </p>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/santibarclay/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-security-blue hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Mi Misión
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hacer que la seguridad digital sea accesible, práctica y fácil de entender para todas las familias argentinas. 
              Creo que todos merecen estar protegidos en el mundo digital, sin importar su nivel técnico.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-3 sm:p-6">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-security-blue mx-auto mb-2 sm:mb-3" />
                <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Free */}
        <Card className="mb-12 bg-security-green/5 border-security-green/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Heart className="h-6 w-6 text-security-green" />
              <span>¿Por qué es gratis?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>La seguridad digital no debería ser un privilegio.</strong> Creo firmemente que el acceso 
                a educación de calidad sobre ciberseguridad debe estar disponible para todos, sin barreras económicas.
              </p>
              <p>
                En mi trabajo diario, veo cómo las empresas invierten millones en herramientas de seguridad, 
                pero la mayoría de las brechas se deben a errores humanos básicos que se previenen con educación.
              </p>
              <p>
                {SITE_NAME} es mi manera de retribuir a la comunidad argentina y democratizar el conocimiento 
                que puede proteger a familias enteras de fraudes digitales.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Valores</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">Simplicidad</h4>
                <p className="text-gray-600 text-sm">
                  Convertimos conceptos complejos en acciones simples y prácticas
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🇦🇷</div>
                <h4 className="font-semibold text-gray-900 mb-2">Contexto Local</h4>
                <p className="text-gray-600 text-sm">
                  Ejemplos y casos reales del ecosistema digital argentino
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Development Section */}
        <Card className="mb-12 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <div className="text-2xl">🤖</div>
              <span>Desarrollado 100% con IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cómo se hizo</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Plataforma:</strong> Claude Code by Anthropic (gracias Akua)</li>
                  <li>• <strong>Costo desarrollo:</strong> ~$35 USD en tokens</li>
                  <li>• <strong>API Key HIBP:</strong> ~$45 USD/año (verificación de brechas)</li>
                  <li>• <strong>Dominio:</strong> ~$20 USD/año</li>
                  <li>• <strong>Tiempo:</strong> 3 sesiones intensivas</li>
                  <li>• <strong>Líneas:</strong> 6,200+ de código</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Agradecimientos</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <a href="https://akua.la" target="_blank" rel="noopener noreferrer" className="text-security-blue hover:underline"><strong>Akua</strong></a> por los tokens de Claude</li>
                  <li>• <strong>Anthropic</strong> por Claude Code</li>
                  <li>• <strong>Vercel</strong> por el hosting gratuito</li>
                  <li>• <strong>Comunidad</strong> que inspirará mejoras</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-security-blue to-blue-600 text-white text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">¿Listo para empezar a cuidarte?</h3>
            <p className="text-lg mb-6 opacity-90">
              Unite a cientos de argentinos que ya están protegiendo su vida digital
            </p>
            <Button asChild size="lg" className="bg-white text-security-blue hover:bg-gray-100">
              <Link href="/register">
                Empezar mi protección gratuita
              </Link>
            </Button>
            <p className="mt-4 text-sm opacity-75">
              ✓ Sin registro complejo ✓ Sin spam ✓ 100% gratuito
            </p>
            <p className="mt-2 text-xs opacity-60">
              Desarrollado con IA responsable
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}