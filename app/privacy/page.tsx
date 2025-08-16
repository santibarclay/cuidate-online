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
        {/* Intro */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-700 leading-relaxed">
              En <strong>{SITE_NAME}</strong> respetamos tu privacidad. Esta política explica cómo manejamos 
              tu información personal de acuerdo con la <strong>Ley 25.326 de Protección de Datos Personales</strong> de Argentina.
            </p>
          </CardContent>
        </Card>

        {/* Datos que recolectamos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔍 Información que Recolectamos</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Lo que SÍ almacenamos (solo en tu dispositivo):</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Nombre o alias que elegís</li>
                  <li>• Tu progreso en las misiones</li>
                  <li>• Preferencias de configuración</li>
                  <li>• Medallas obtenidas</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">❌ Lo que NO recolectamos nosotros:</h4>
                <ul className="text-red-700 space-y-1">
                  <li>• Email o datos de contacto</li>
                  <li>• Información personal identificatoria</li>
                  <li>• Datos del navegador o dispositivo para tracking</li>
                  <li>• Cookies de seguimiento o publicitarias</li>
                  <li>• Historial de navegación fuera del sitio</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cómo usamos la información */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🎯 Cómo Usamos tu Información</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p><strong>Propósito único:</strong> Mejorar tu experiencia educativa en ciberseguridad.</p>
              <p><strong>Almacenamiento:</strong> Toda tu información se guarda únicamente en el localStorage de tu navegador.</p>
              <p><strong>No compartimos:</strong> Nunca enviamos tus datos personales a servidores externos (solo analytics anónimos de Vercel).</p>
              <p><strong>No comercializamos:</strong> No vendemos ni monetizamos información personal.</p>
            </div>
          </CardContent>
        </Card>

        {/* Tus derechos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>⚖️ Tus Derechos (Ley 25.326)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Derechos que tenés:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Acceso:</strong> Ver qué datos tenemos (están en tu navegador)</li>
                  <li>• <strong>Rectificación:</strong> Modificar datos incorrectos</li>
                  <li>• <strong>Supresión:</strong> Eliminar todos tus datos</li>
                  <li>• <strong>Portabilidad:</strong> Exportar tu progreso</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Cómo ejercer tus derechos:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Ver datos:</strong> Ir a tu perfil</li>
                  <li>• <strong>Modificar:</strong> Editar desde configuración</li>
                  <li>• <strong>Eliminar:</strong> Borrar datos del navegador</li>
                  <li>• <strong>Exportar:</strong> Función de descarga disponible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📊 Analytics y Métricas</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-gray-700">
                Utilizamos <strong>Vercel Analytics</strong> para entender el uso básico del sitio:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">✅ Lo que sí recolecta Vercel (anónimamente):</h5>
                <ul className="text-blue-700 space-y-1">
                  <li>• Número de visitantes únicos (sin identificación personal)</li>
                  <li>• Páginas visitadas y tiempo en el sitio</li>
                  <li>• País de origen (basado en IP, pero sin almacenar la IP)</li>
                  <li>• Tipo de dispositivo (móvil/desktop) y navegador</li>
                  <li>• Datos completamente agregados y anonimizados</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                <p className="text-sm text-yellow-800">
                  <strong>Importante:</strong> Vercel procesa direcciones IP para determinar ubicación geográfica, 
                  pero las IPs son inmediatamente anonimizadas y nunca almacenadas. Solo se conservan 
                  estadísticas agregadas por país/región.
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Estos datos nos ayudan a mejorar la plataforma sin comprometer tu identidad o privacidad personal.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Verificación de Brechas */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔍 Verificación de Brechas de Datos</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <p className="text-gray-700">
                <strong>Cuidate Online</strong> ofrece un servicio de verificación de brechas de datos para ayudarte 
                a identificar si tu información personal fue comprometida en ataques cibernéticos conocidos.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">🔒 Tu privacidad está 100% protegida:</h5>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>NO almacenamos tu email:</strong> Tu dirección de correo se procesa únicamente durante la consulta y se descarta inmediatamente</li>
                  <li>• <strong>NO guardamos resultados:</strong> Los datos de brechas encontradas no se almacenan en nuestros servidores</li>
                  <li>• <strong>NO creamos perfiles:</strong> No asociamos consultas con usuarios individuales</li>
                  <li>• <strong>Consultas anónimas:</strong> Cada verificación es completamente independiente y anónima</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-gray-800">Proveedores de datos utilizados:</h5>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h6 className="font-semibold text-blue-800 mb-2">Have I Been Pwned (HIBP)</h6>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• <strong>Uso:</strong> Base de datos principal en producción</li>
                    <li>• <strong>Datos:</strong> Información de brechas verificadas y confirmadas</li>
                    <li>• <strong>Transmisión:</strong> Tu email se envía via HTTPS a la API oficial de HIBP</li>
                    <li>• <strong>Procesamiento:</strong> HIBP procesa tu consulta y devuelve información de brechas (sin contraseñas)</li>
                    <li>• <strong>Límites:</strong> 3 consultas por IP cada 24 horas para prevenir abuso</li>
                    <li>• <strong>Política de HIBP:</strong> <a href="https://haveibeenpwned.com/Privacy" target="_blank" className="underline">haveibeenpwned.com/Privacy</a></li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h6 className="font-semibold text-gray-800 mb-2">ProxyNova</h6>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• <strong>Uso:</strong> Base de datos de desarrollo/respaldo</li>
                    <li>• <strong>Datos:</strong> Colección de credenciales expuestas públicamente</li>
                    <li>• <strong>Limitaciones:</strong> Base de datos más básica, puede mostrar contraseñas parciales</li>
                    <li>• <strong>Disponibilidad:</strong> Sin límites de consulta</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Importante sobre el procesamiento de emails:</h5>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Tu email se transmite temporalmente a servicios externos (HIBP/ProxyNova) para realizar la consulta</li>
                  <li>• Esta transmisión es necesaria para verificar si tu email apareció en brechas conocidas</li>
                  <li>• Los servicios externos tienen sus propias políticas de privacidad (enlazadas arriba)</li>
                  <li>• Una vez completada la consulta, tu email no queda almacenado en Cuidate Online</li>
                  <li>• Puedes elegir qué proveedor usar en la página de verificación avanzada</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-2">🛡️ Medidas de protección implementadas:</h5>
                <ul className="text-orange-700 text-sm space-y-1">
                  <li>• <strong>Rate limiting:</strong> Máximo 3 consultas HIBP por IP cada 24 horas</li>
                  <li>• <strong>Validación de entrada:</strong> Solo emails válidos son procesados</li>
                  <li>• <strong>HTTPS obligatorio:</strong> Toda comunicación está encriptada</li>
                  <li>• <strong>Sin logs persistentes:</strong> No guardamos registros de consultas de emails</li>
                  <li>• <strong>Acceso controlado:</strong> Página avanzada protegida por contraseña</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                <strong>Recomendación:</strong> Usa un email de prueba o secundario si prefieres máxima privacidad, 
                aunque tu email principal no será almacenado bajo ninguna circunstancia.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Seguridad */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔒 Seguridad de los Datos</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3 text-gray-700">
              <p><strong>Encriptación:</strong> Toda comunicación usa HTTPS/TLS.</p>
              <p><strong>Sin servidores:</strong> No tenemos bases de datos que puedan ser hackeadas.</p>
              <p><strong>Control total:</strong> Vos controlás completamente tus datos.</p>
              <p><strong>Auditorías:</strong> Código abierto y revisado por profesionales de seguridad.</p>
            </div>
          </CardContent>
        </Card>

        {/* Cambios */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔄 Cambios a esta Política</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700">
              Si realizamos cambios a esta política de privacidad, te notificaremos mediante:
            </p>
            <ul className="mt-3 space-y-1 text-gray-700">
              <li>• Aviso prominente en el sitio web</li>
              <li>• Actualización de la fecha de última modificación</li>
              <li>• Para cambios significativos: notificación especial</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>📧 Contacto</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Para consultas sobre esta política de privacidad o el tratamiento de datos personales:
            </p>
            <div className="bg-gray-50 border rounded-lg p-4">
              <p><strong>Responsable:</strong> {CREATOR.name}</p>
              <p><strong>Sitio web:</strong> <a href={SITE_URL} className="text-security-blue hover:underline">{SITE_URL}</a></p>
              <p><strong>Contacto:</strong> <a href="https://www.linkedin.com/in/santibarclay/" target="_blank" rel="noopener noreferrer" className="text-security-blue hover:underline">LinkedIn</a></p>
            </div>
          </CardContent>
        </Card>

        {/* Footer info */}
        <div className="text-center text-sm text-gray-500">
          <p>Última actualización: 15 de agosto de 2025</p>
          <p className="mt-2">Esta política cumple con la Ley 25.326 de Protección de Datos Personales de Argentina</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}