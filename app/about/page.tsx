import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { 
  ArrowLeft, 
  ExternalLink, 
  Shield, 
  Users, 
  Heart,
  Target,
  BookOpen,
  Award
} from 'lucide-react';
import { SITE_NAME, CREATOR } from '@/lib/constants';

export default function AboutPage() {
  const stats = [
    { label: "Usuarios protegidos", value: "500+", icon: Users },
    { label: "Misiones educativas", value: "9", icon: BookOpen },
    { label: "Conceptos de seguridad", value: "25+", icon: Shield },
    { label: "Horas de contenido", value: "2+", icon: Target }
  ];

  const timeline = [
    {
      year: "2024",
      title: "Nace Cuidate Online",
      description: "Después de ver tantos casos de hackeos evitables, decidí crear una plataforma educativa gratuita para la comunidad argentina."
    },
    {
      year: "2023",
      title: "Experiencia en Akua",
      description: "Como Head of Cybersecurity, confirmé que la educación es la mejor defensa contra los ataques digitales."
    },
    {
      year: "2022",
      title: "Docencia en UBA",
      description: "Empecé a enseñar en la Universidad de Buenos Aires, descubriendo mi pasión por la educación en ciberseguridad."
    },
    {
      year: "2020",
      title: "Especialización",
      description: "Me enfoqué en ciberseguridad después de trabajar en múltiples startups y ver los riesgos digitales firsthand."
    }
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
        {/* Mission Statement */}
        <Card className="mb-12">
          <CardContent className="p-8 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestra Misión
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Hacer que la seguridad digital sea accesible, práctica y fácil de entender para todas las familias argentinas. 
              Creemos que todos merecen estar protegidos en el mundo digital, sin importar su nivel técnico.
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-security-blue mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Santiago's Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">La Historia de Santiago</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-security-blue/20 flex-shrink-0">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHsIKDu487_dQ/profile-displayphoto-shrink_800_800/B4DZTNX_xsHkAc-/0/1738612408100?e=1758153600&v=beta&t=YO5iPzp16A0qexTZoZgd7fV4OaOZyCSo-0v0lgUUcrM"
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

        {/* Timeline */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">El Camino hacia {SITE_NAME}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-security-blue text-white rounded-full flex items-center justify-center font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
            <CardTitle className="text-2xl">Nuestros Valores</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
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
              <div className="text-center">
                <div className="text-3xl mb-3">🤝</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comunidad</h4>
                <p className="text-gray-600 text-sm">
                  Construimos una comunidad más segura, paso a paso
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Plans */}
        <Card className="mb-12 bg-security-blue/5 border-security-blue/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center space-x-2">
              <Target className="h-6 w-6 text-security-blue" />
              <span>¿Qué viene después?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-security-blue rounded-full"></div>
                <span className="text-gray-700">Más misiones de Nivel 2 y 3 (SIM Swapping, Home Banking, etc.)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-security-blue rounded-full"></div>
                <span className="text-gray-700">Sistema de ligas competitivas (Bronce, Plata, Oro)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-security-blue rounded-full"></div>
                <span className="text-gray-700">Simuladores interactivos de phishing argentino</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-security-blue rounded-full"></div>
                <span className="text-gray-700">Contenido específico para adolescentes</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-security-blue rounded-full"></div>
                <span className="text-gray-700">Integración con bancos argentinos para alertas en tiempo real</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <p className="text-sm text-gray-600">
                <strong>¿Tenés ideas?</strong> Tu feedback es fundamental para hacer de {SITE_NAME} una 
                plataforma cada vez más útil. Contactame en LinkedIn con tus sugerencias.
              </p>
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
                  <li>• <strong>Plataforma:</strong> Claude Code by Anthropic</li>
                  <li>• <strong>Costo:</strong> ~$5 USD en tokens</li>
                  <li>• <strong>Tiempo:</strong> 1 sesión intensiva</li>
                  <li>• <strong>Líneas:</strong> 10,552 de código</li>
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
            
            <div className="bg-white/80 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                <div className="mr-2">⚠️</div>
                Reflexión sobre Riesgos de IA
              </h4>
              <p className="text-orange-800 text-sm mb-3">
                Irónicamente, un sitio sobre <strong>ciberseguridad</strong> fue creado enteramente por IA. 
                Esto demuestra cómo la IA puede democratizar la educación, pero también ilustra nuevos riesgos:
              </p>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Los criminales también usan IA para crear ataques más sofisticados</li>
                <li>• El código generado por IA debe auditarse con el mismo rigor que el humano</li>
                <li>• Necesitamos nuevas misiones educativas sobre IA y ciberseguridad</li>
              </ul>
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