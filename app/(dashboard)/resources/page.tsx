import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Shield, 
  AlertTriangle, 
  Book, 
  Phone, 
  Mail,
  Globe,
  Smartphone,
  CreditCard,
  Lock
} from 'lucide-react';

export default function ResourcesPage() {
  const emergencyResources = [
    {
      title: "Te hackearon el WhatsApp",
      icon: <Smartphone className="h-5 w-5" />,
      steps: [
        "Cambiá inmediatamente tu contraseña de WhatsApp Web",
        "Deslogueate de todos los dispositivos desde WhatsApp > Dispositivos vinculados",
        "Activá la verificación en 2 pasos si no la tenés",
        "Informá a tus contactos que tu cuenta fue comprometida"
      ]
    },
    {
      title: "Te hackearon el Gmail",
      icon: <Mail className="h-5 w-5" />,
      steps: [
        "Cambiá tu contraseña desde otro dispositivo",
        "Revisá la actividad reciente en myaccount.google.com",
        "Revocá el acceso a aplicaciones sospechosas",
        "Activá la verificación en 2 pasos",
        "Cambía las contraseñas de todas las cuentas importantes"
      ]
    },
    {
      title: "Transacciones bancarias no autorizadas",
      icon: <CreditCard className="h-5 w-5" />,
      steps: [
        "Contactá inmediatamente a tu banco",
        "Bloqueá todas tus tarjetas",
        "Cambía las claves del home banking",
        "Solicitá un resumen de movimientos",
        "Hacé la denuncia policial si es necesario"
      ]
    }
  ];

  const officialTools = [
    {
      title: "Have I Been Pwned",
      description: "Verificá si tu email fue comprometido en brechas de datos",
      url: "https://haveibeenpwned.com",
      category: "Auditoría"
    },
    {
      title: "Bitwarden",
      description: "Password manager gratuito y seguro",
      url: "https://bitwarden.com",
      category: "Contraseñas"
    },
    {
      title: "Google Authenticator",
      description: "App oficial para autenticación en dos factores",
      url: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2",
      category: "2FA"
    },
    {
      title: "Malwarebytes",
      description: "Herramienta para detectar y eliminar malware de tu computadora",
      url: "https://www.malwarebytes.com",
      category: "Antimalware"
    }
  ];

  const argentineResources = [
    {
      title: "ENACOM - Ciberseguridad",
      description: "Recursos oficiales sobre ciberseguridad del gobierno argentino",
      url: "https://www.enacom.gob.ar",
      category: "Oficial"
    },
    {
      title: "Banco Central - Seguridad Financiera",
      description: "Guías sobre seguridad en servicios financieros",
      url: "https://www.bcra.gob.ar",
      category: "Bancos"
    },
    {
      title: "AFIP - Seguridad Digital",
      description: "Consejos de seguridad para trámites digitales",
      url: "https://www.afip.gob.ar",
      category: "Oficial"
    },
    {
      title: "Defensa del Consumidor",
      description: "Denunciá fraudes y estafas digitales",
      url: "https://www.argentina.gob.ar/produccion/defensadelconsumidor",
      category: "Denuncias"
    }
  ];

  const educationalContent = [
    {
      title: "¿Qué es el Phishing?",
      description: "Aprendé a identificar mensajes fraudulentos",
      content: "El phishing es una técnica donde los criminales se hacen pasar por empresas o personas confiables para robar información personal como contraseñas, datos bancarios o números de tarjeta."
    },
    {
      title: "¿Qué es el SIM Swapping?",
      description: "Cómo protegerte de este ataque en Argentina",
      content: "Es cuando los criminales convencen a tu operadora móvil para transferir tu número a su SIM. Así reciben tus códigos SMS y pueden acceder a tus cuentas. Configurá un PIN de SIM para prevenirlo."
    },
    {
      title: "Contraseñas Seguras",
      description: "Cómo crear contraseñas que no puedan hackear",
      content: "Una contraseña segura debe tener al menos 12 caracteres, combinar mayúsculas, minúsculas, números y símbolos. Usá frases memorables como 'MiPerro123!Come' en lugar de 'password123'."
    },
    {
      title: "2FA - ¿Qué es?",
      description: "Por qué la autenticación en dos factores es esencial",
      content: "2FA significa que necesitás dos cosas para acceder: algo que sabés (contraseña) y algo que tenés (tu celular). Es la mejor protección contra hackeos, incluso si roban tu contraseña."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Recursos y Guías de Emergencia
        </h1>
        <p className="text-gray-600">
          Herramientas oficiales, guías de emergencia y recursos educativos para mantenerte protegido
        </p>
      </div>

      {/* Emergency Section */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">¿Te hackearon? Actúa rápido</h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {emergencyResources.map((resource, index) => (
            <Card key={index} className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  {resource.icon}
                  <span>{resource.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-red-700">
                  {resource.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start space-x-2">
                      <span className="flex-shrink-0 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {stepIndex + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">¿Necesitás ayuda urgente?</h3>
              <p className="text-red-700 text-sm">
                Si estás siendo víctima de una estafa activa o perdiste dinero, contactá inmediatamente a tu banco. 
                Lamentablemente, la denuncia policial es una pérdida de tiempo y es lo último que debés hacer, 
                pero hay que hacerlo para que quede registro. La velocidad de acción es crucial.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Tools */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="h-6 w-6 text-security-blue" />
          <h2 className="text-2xl font-bold text-gray-900">Herramientas Oficiales</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {officialTools.map((tool, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href={tool.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visitar sitio oficial
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Argentine Resources */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Globe className="h-6 w-6 text-security-green" />
          <h2 className="text-2xl font-bold text-gray-900">Recursos Argentinos</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {argentineResources.map((resource, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{resource.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {resource.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ir al sitio oficial
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Book className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">Conceptos Clave</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {educationalContent.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Santiago */}
      <Card className="bg-security-blue text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-4">¿Tenés dudas o sugerencias?</h3>
          <p className="mb-6 opacity-90">
            Si tenés preguntas sobre seguridad digital o sugerencias para mejorar Cuidate Online, 
            no dudes en contactarme.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button asChild variant="secondary">
              <a href="https://www.linkedin.com/in/santibarclay/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
          <p className="mt-4 text-sm opacity-75">
            Santiago Barclay - Head of Cybersecurity en Akua
          </p>
        </CardContent>
      </Card>
    </div>
  );
}