'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Smartphone, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { UserPreferences } from '@/lib/gamification';

interface TwoFactorSetupProps {
  userPreferences: UserPreferences;
  onComplete: (score?: number) => void;
  emailOnly?: boolean;
  whatsappOnly?: boolean;
}

export function TwoFactorSetup({ userPreferences, onComplete, emailOnly = false, whatsappOnly = false }: TwoFactorSetupProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  
  const isGmailUser = userPreferences.email === 'gmail';
  const isAndroidUser = userPreferences.device === 'android';

  const handleStepComplete = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);
  };

  const allStepsCompleted = emailOnly
    ? completedSteps.has('email')
    : whatsappOnly
    ? completedSteps.has('whatsapp')
    : completedSteps.has('email') && completedSteps.has('whatsapp');

  const renderEmailSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-security-blue" />
          <span>{emailOnly ? 'Activar 2FA en tu correo electrónico' : 'Parte A: Activar 2FA en tu correo'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGmailUser ? (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">📧 Instrucciones para Gmail</h4>
              <p className="text-blue-700 text-sm mb-3">
                Como usás Gmail, seguí estos pasos específicos:
              </p>
              <ol className="text-blue-700 text-sm space-y-2 list-decimal list-inside">
                <li>Andá a <strong>myaccount.google.com</strong></li>
                <li>Hacé click en <strong>&quot;Seguridad&quot;</strong> en el menú</li>
                <li>Buscá <strong>&quot;Verificación en 2 pasos&quot;</strong> y hacé click</li>
                <li>Seguí el asistente para configurar con tu número de teléfono</li>
                <li>Descargá <strong>Google Authenticator</strong> desde Play Store para mayor seguridad</li>
                <li>Guardá los códigos de respaldo en un lugar seguro</li>
              </ol>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => window.open('https://myaccount.google.com/security', '_blank')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Configuración Gmail
              </Button>
              <Button
                onClick={() => window.open('https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2', '_blank')}
                variant="outline"
              >
                Google Authenticator
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">📧 Instrucciones genéricas</h4>
              <p className="text-gray-700 text-sm mb-3">
                Elegí tu proveedor de email y seguí las instrucciones:
              </p>
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Gmail</span>
                    <Button
                      size="sm"
                      onClick={() => window.open('https://support.google.com/accounts/answer/185839', '_blank')}
                    >
                      Ver guía
                    </Button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Outlook/Hotmail</span>
                    <Button
                      size="sm"
                      onClick={() => window.open('https://support.microsoft.com/es-es/account-billing/c%C3%B3mo-usar-la-verificaci%C3%B3n-en-dos-pasos-con-su-cuenta-de-microsoft-c7910146-672f-01e9-50a0-93b4585e7eb4', '_blank')}
                    >
                      Ver guía
                    </Button>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded p-3">
                  <span className="text-sm text-gray-600">
                    <strong>Otros proveedores:</strong> Buscá &quot;activar 2FA&quot; o &quot;verificación en dos pasos&quot; 
                    en la configuración de seguridad de tu servicio
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <h5 className="font-medium text-green-800 mb-1">💡 Consejos importantes:</h5>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Usá una app autenticadora (más seguro que SMS)</li>
            <li>• Guardá los códigos de respaldo en papel, y guarda ese papel en un lugar seguro donde no se pierda ni se dañe</li>
          </ul>
        </div>
        
        <div className="mt-4">
          <Button
            onClick={() => handleStepComplete('email')}
            disabled={completedSteps.has('email')}
            className={completedSteps.has('email') ? 'bg-green-600' : ''}
          >
            {completedSteps.has('email') ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                2FA del email activado ✅
              </>
            ) : (
              'Marcar como completado'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderWhatsAppSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          <span>{whatsappOnly ? 'Activar 2FA en WhatsApp' : 'Parte B: Activar 2FA en WhatsApp'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isAndroidUser ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">📱 Instrucciones para Android</h4>
              <ol className="text-green-700 text-sm space-y-2 list-decimal list-inside">
                <li>Abrí WhatsApp</li>
                <li>Andá a <strong>Configuración</strong> (los tres puntos arriba a la derecha)</li>
                <li>Tocá <strong>&quot;Cuenta&quot;</strong></li>
                <li>Tocá <strong>&quot;Verificación en dos pasos&quot;</strong></li>
                <li>Tocá <strong>&quot;Activar&quot;</strong></li>
                <li>Elegí un PIN de 6 dígitos que puedas recordar</li>
                <li>Confirmá el PIN</li>
                <li>Agregá un email de recuperación (opcional pero recomendado)</li>
              </ol>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">📱 Instrucciones generales</h4>
              <ol className="text-gray-700 text-sm space-y-2 list-decimal list-inside">
                <li>Abrí WhatsApp</li>
                <li>Andá a <strong>Configuración</strong> o <strong>Ajustes</strong></li>
                <li>Buscá <strong>&quot;Cuenta&quot;</strong> y después <strong>&quot;Verificación en dos pasos&quot;</strong></li>
                <li>Activá la función</li>
                <li>Elegí un PIN de 6 dígitos memorable</li>
                <li>Confirmá el PIN</li>
                <li>Agregá un email de recuperación</li>
              </ol>
            </div>
          )}
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h5 className="font-medium text-red-800 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              ⚠️ MUY IMPORTANTE
            </h5>
            <ul className="text-red-700 text-sm space-y-2">
              <li>• <strong>ANOTÁ tu PIN en papel</strong> y guardalo en un lugar seguro</li>
              <li>• <strong>NADIE te va a pedir tu PIN</strong> - ni por chat, ni por teléfono, ni verbalmente</li>
              <li>• Solo la <strong>propia aplicación de WhatsApp</strong> te lo pedirá cada tanto para asegurarse que no te lo olvides</li>
              <li>• WhatsApp también te pedirá el PIN al instalar la app en un celular nuevo</li>
              <li>• <strong>NUNCA lo compartas</strong> con nadie bajo ninguna circunstancia</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h5 className="font-medium text-blue-800 mb-1">🔒 ¿Para qué sirve esto?</h5>
            <p className="text-blue-700 text-sm">
              Si alguien intenta robar tu cuenta de WhatsApp duplicando tu SIM card, 
              no podrá activar WhatsApp sin tu PIN de 6 dígitos.
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <Button
            onClick={() => handleStepComplete('whatsapp')}
            disabled={completedSteps.has('whatsapp')}
            className={completedSteps.has('whatsapp') ? 'bg-green-600' : ''}
          >
            {completedSteps.has('whatsapp') ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                2FA de WhatsApp activado ✅
              </>
            ) : (
              'Marcar como completado'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-2xl font-semibold mb-2">
          {emailOnly ? 'Activar 2FA en tu correo electrónico' :
           whatsappOnly ? 'Activar 2FA en WhatsApp' :
           'Activar 2FA en Email y WhatsApp'}
        </h2>
        <p className="text-gray-600">
          {emailOnly ? 'Protegé tu correo electrónico con una capa extra de seguridad' :
           whatsappOnly ? 'Protegé tu WhatsApp con verificación en dos pasos' :
           'Protegé tus cuentas más importantes con una capa extra de seguridad'}
        </p>
      </div>

      {!whatsappOnly && renderEmailSection()}
      {!emailOnly && renderWhatsAppSection()}

      <div className="text-center">
        <Button
          onClick={() => onComplete(100)}
          disabled={!allStepsCompleted}
          size="lg"
          className={allStepsCompleted ? 'bg-security-green hover:bg-green-700' : ''}
        >
          {allStepsCompleted ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              ¡Completar misión!
            </>
          ) : (
            emailOnly ? 'Completá la configuración para continuar' :
             whatsappOnly ? 'Completá la configuración para continuar' :
             'Completá ambas partes para continuar'
          )}
        </Button>
        
        {!allStepsCompleted && (
          <p className="text-sm text-gray-500 mt-2">
            {emailOnly ? 'Debés activar 2FA en tu correo electrónico' :
             whatsappOnly ? 'Debés activar 2FA en WhatsApp' :
             'Debés activar 2FA tanto en tu email como en WhatsApp'}
          </p>
        )}
      </div>
    </div>
  );
}