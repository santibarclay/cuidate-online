import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/layout/footer';
import { ArrowLeft, Shield } from 'lucide-react';
import { SITE_NAME, CREATOR, SITE_URL } from '@/lib/constants';

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro - Lo más importante primero */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-green-800 mb-3">🛡️ No guardamos ningún dato personal</h2>
              <p className="text-lg text-green-700 leading-relaxed">
                <strong>{SITE_NAME}</strong> funciona completamente en tu navegador. Tu progreso, preferencias y datos 
                se almacenan únicamente en tu dispositivo usando localStorage.
              </p>
            </div>
            <p className="text-gray-600">
              Esta política cumple con la <strong>Ley 25.326 de Protección de Datos Personales</strong> de Argentina.
            </p>
          </CardContent>
        </Card>

        {/* Datos y Uso - Sección consolidada */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📋 Qué Datos Manejamos y Cómo</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Lo que almacenamos localmente */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ Almacenado solo en tu navegador:</h4>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Tu nombre o alias</li>
                  <li>• Progreso en misiones y medallas</li>
                  <li>• Configuraciones personales</li>
                </ul>
              </div>

              {/* Tus derechos */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">⚖️ Tus derechos:</h4>
                <p className="text-gray-700 mb-2">
                  Podés ver, modificar o eliminar todos tus datos desde tu perfil. 
                  También podés exportar tu progreso o borrar todo desde la configuración del navegador.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Servicios Externos - Solo si los usás */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🌐 Servicios Externos (Solo si Elegís Usarlos)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-3">⚠️ Importante:</h4>
                <p className="text-yellow-700">
                  Solo enviamos datos a servicios externos si <strong>elegís usar</strong> ciertas funciones. 
                  Hay grandes avisos antes de usar estas funciones.
                </p>
              </div>

              <h4 className="font-semibold text-gray-900 mb-3">Proveedores de datos utilizados:</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Have I Been Pwned</h5>
                  <p className="text-blue-700 text-sm mb-2">
                    <strong>Propósito:</strong> Verificar si tu email apareció en brechas de datos conocidas
                  </p>
                  <a href="https://haveibeenpwned.com/Privacy" target="_blank" className="text-blue-600 underline text-sm">
                    Ver su política de privacidad →
                  </a>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-2">ProxyNova</h5>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Propósito:</strong> Base de datos alternativa para verificación de brechas
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">🔒 Tu email nunca se guarda</h5>
                <p className="text-green-700 text-sm">
                  Si usás el verificador de brechas, tu email se envía temporalmente a estos servicios 
                  solo para la consulta y se descarta inmediatamente. No lo almacenamos nosotros.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información Adicional */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📋 Información Adicional</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Seguridad */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">🔒 Seguridad:</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Toda comunicación usa HTTPS</li>
                  <li>• Sin bases de datos centralizadas</li>
                  <li>• Control total en tu dispositivo</li>
                  <li>• Código abierto y auditado</li>
                </ul>
              </div>
              
              {/* Contacto */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">📧 Contacto:</h4>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Responsable:</strong> {CREATOR.name}
                </p>
                <p className="text-sm">
                  <a href="https://www.linkedin.com/in/santibarclay/" target="_blank" rel="noopener noreferrer" className="text-security-blue hover:underline">
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
            
            {/* Cambios */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">🔄 Cambios a esta política:</h4>
              <p className="text-gray-700 text-sm">
                Te notificaremos cualquier cambio con un aviso prominente en el sitio.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center text-sm text-gray-500">
          <p>Última actualización: 16 de agosto de 2025</p>
          <p className="mt-2">Esta política cumple con la Ley 25.326 de Protección de Datos Personales de Argentina</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}