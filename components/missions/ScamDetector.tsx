'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Mail, Phone, MessageSquare, Globe, ChevronRight } from 'lucide-react';

interface ScamExample {
  id: string;
  type: 'email' | 'phone' | 'whatsapp' | 'website';
  content: string;
  isScam: boolean;
  explanation: string;
  redFlags?: string[];
}

const SCAM_EXAMPLES: ScamExample[] = [
  // EMAILS
  {
    id: 'email-1',
    type: 'email',
    content: 'De: noreply@mercadopago.com.ar\nAsunto: ⚠️ URGENTE: Tu cuenta será suspendida en 24hs\n\nHola,\n\nDetectamos actividad sospechosa en tu cuenta. Hacé click ACÁ para verificar tus datos antes de las 24hs o tu cuenta será BLOQUEADA PERMANENTEMENTE.\n\nVerificar ahora: http://mercado-pago-seguridad.com.ar',
    isScam: true,
    explanation: 'Email de phishing que simula ser de MercadoPago',
    redFlags: ['Urgencia artificial', 'Amenazas de bloqueo', 'Dominio falso']
  },
  {
    id: 'email-2', 
    type: 'email',
    content: 'De: Banco Santander <notificaciones@santander.com.ar>\nAsunto: Resumen de cuenta - Enero 2025\n\nEstimado cliente,\n\nAdjuntamos su resumen de cuenta correspondiente al período enero 2025.\n\nSaludos,\nEquipo Santander',
    isScam: false,
    explanation: 'Email legítimo con dominio oficial y sin pedido de datos',
    redFlags: []
  },
  {
    id: 'email-3',
    type: 'email',
    content: 'De: AFIP Administración <afip.admin@gmail.com>\nAsunto: DEVOLUCIÓN DE IMPUESTOS $450.000\n\n¡FELICITACIONES!\n\nTenés una devolución de $450.000 en impuestos. Para cobrarla, ingresá tu CUIT y datos bancarios en: www.afip-devolucion.com.ar\n\n¡Date prisa! Solo tenés 48 horas.',
    isScam: true,
    explanation: 'AFIP nunca usa Gmail ni ofrece devoluciones por email',
    redFlags: ['Email personal (Gmail)', 'Montos excesivos', 'Urgencia', 'Pide datos bancarios']
  },
  // PHONE CALLS
  {
    id: 'phone-1',
    type: 'phone',
    content: '📞 Te llama alguien:\n\n"Hola, soy de Visa. Detectamos compras sospechosas en tu tarjeta por $50.000. Para cancelarlas, necesito que me confirmes el CVV y vencimiento de tu tarjeta."',
    isScam: true,
    explanation: 'Los bancos NUNCA piden datos por teléfono',
    redFlags: ['Pide CVV por teléfono', 'Urgencia', 'No se identifica correctamente']
  },
  {
    id: 'phone-2',
    type: 'phone',
    content: '📞 Te llama alguien:\n\n"Hola, soy de soporte técnico de Google. Detectamos que alguien está intentando acceder a tu cuenta. Para protegerla, necesito que me digas el código de 6 dígitos que te va a aparecer en el celular ahora."',
    isScam: true,
    explanation: 'NUNCA compartir códigos de verificación por teléfono. Los códigos OTP/2FA son solo para vos. Google, WhatsApp, bancos NUNCA te llaman pidiendo estos códigos.',
    redFlags: ['Pide código de verificación', 'Llamada no solicitada', 'Urgencia artificial', 'Se hace pasar por empresa legítima']
  },
  // WHATSAPP
  {
    id: 'whatsapp-1',
    type: 'whatsapp',
    content: '💬 WhatsApp de tu hermana (nombre real, foto real):\n\n"Hola! Necesito que me ayudes urgente con una transferencia. Estoy en el banco pero no me anda la app. ¿Podés transferirle $30.000 a un amigo mío? Te paso su CBU: 1234567890123456789012. Mañana te devuelvo todo."',
    isScam: true,
    explanation: 'Es común que hackeen cuentas de WhatsApp de familiares y conocidos para hacer este tipo de estafas. Aunque aparezca el nombre y foto real, la cuenta puede estar comprometida.',
    redFlags: ['Pide transferencia a terceros', 'Urgencia', 'No permite verificación directa', 'Excusa para no usar su propia app']
  },
  {
    id: 'whatsapp-2',
    type: 'whatsapp',
    content: '💬 WhatsApp de tu hermana:\n\n"Hola! Te comparto el link del regalo de cumple que me gustó por si lo querés ver: www.mercadolibre.com.ar/MLA123456789"',
    isScam: false,
    explanation: 'Mensaje normal con link a MercadoLibre oficial',
    redFlags: []
  },
  {
    id: 'phone-3',
    type: 'phone',
    content: '📞 Te llama tu banco:\n\n"Estimado cliente, le recordamos que su tarjeta vence el próximo mes. Puede renovarla en cualquier sucursal o a través de nuestra app oficial. Horarios de atención: 9 a 15hs. Gracias."',
    isScam: false,
    explanation: 'Solo informa, no pide datos sensibles ni códigos',
    redFlags: []
  },
  // WEBSITES
  {
    id: 'website-1',
    type: 'website',
    content: '🌐 Estás navegando y aparece:\n\nURL: https://homebanking-santander.secure-login.com.ar\n\n"Ingrese su usuario y clave para acceder a Santander Río Online Banking"\n\nLa página se ve idéntica al banco real.',
    isScam: true,
    explanation: 'Sitio falso que simula ser del banco. El dominio real del Santander es "santander.com.ar", no "secure-login.com.ar"',
    redFlags: ['Dominio falso', 'Subdominio engañoso', 'No es el dominio oficial del banco']
  },
  {
    id: 'website-2',
    type: 'website',
    content: '🌐 Estás navegando:\n\nURL: https://www.santander.com.ar/\n\n"Banca por Internet - Santander"\n\nTodos los elementos visuales coinciden con el banco.',
    isScam: false,
    explanation: 'Sitio oficial del banco. El dominio "santander.com.ar" es el correcto (.com.ar indica empresa argentina)',
    redFlags: []
  }
];

interface ScamDetectorProps {
  onComplete: (score: number) => void;
}

export function ScamDetector({ onComplete }: ScamDetectorProps) {
  const [currentExample, setCurrentExample] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const example = SCAM_EXAMPLES[currentExample];
  const isLastExample = currentExample === SCAM_EXAMPLES.length - 1;
  const hasAnswered = example.id in answers;

  const handleAnswer = (isScam: boolean) => {
    setAnswers(prev => ({ ...prev, [example.id]: isScam }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastExample) {
      // Calculate score
      let correct = 0;
      SCAM_EXAMPLES.forEach(ex => {
        if (answers[ex.id] === ex.isScam) {
          correct++;
        }
      });
      const score = Math.round((correct / SCAM_EXAMPLES.length) * 100);
      onComplete(score);
    } else {
      setCurrentExample(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'whatsapp':
        return <MessageSquare className="h-5 w-5" />;
      case 'website':
        return <Globe className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      email: 'Email',
      phone: 'Llamada telefónica',
      whatsapp: 'WhatsApp',
      website: 'Sitio web'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getAnswerColor = (userAnswer: boolean) => {
    if (!hasAnswered) return '';
    const isCorrect = userAnswer === example.isScam;
    return isCorrect ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800';
  };

  const isCorrectAnswer = hasAnswered && answers[example.id] === example.isScam;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🕵️</div>
        <h2 className="text-2xl font-semibold mb-2">Detector de Estafas</h2>
        <p className="text-gray-600 mb-4">
          Analizá cada ejemplo y decidí si es una estafa o es legítimo
        </p>
        <div className="text-sm text-gray-500">
          Ejemplo {currentExample + 1} de {SCAM_EXAMPLES.length}
        </div>
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-security-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentExample + 1) / SCAM_EXAMPLES.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getTypeIcon(example.type)}
            <span>{getTypeLabel(example.type)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 font-mono text-sm whitespace-pre-line">
            {example.content}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-medium mb-4">¿Es esto una estafa?</h3>
            
            <div className="flex space-x-4 justify-center">
              <Button
                onClick={() => handleAnswer(true)}
                disabled={hasAnswered}
                size="lg"
                className={`${hasAnswered ? getAnswerColor(true) : 'bg-red-600 hover:bg-red-700 text-white'} min-w-[120px]`}
              >
                {hasAnswered && answers[example.id] === true && (
                  answers[example.id] === example.isScam ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 mr-2" />
                  )
                )}
                Estafa
              </Button>
              
              <Button
                onClick={() => handleAnswer(false)}
                disabled={hasAnswered}
                size="lg"
                className={`${hasAnswered ? getAnswerColor(false) : 'bg-green-600 hover:bg-green-700 text-white'} min-w-[120px]`}
              >
                {hasAnswered && answers[example.id] === false && (
                  answers[example.id] === example.isScam ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 mr-2" />
                  )
                )}
                Legítimo
              </Button>
            </div>
          </div>

          {showExplanation && (
            <div className="space-y-4">
              {/* Correct/Incorrect Feedback */}
              {isCorrectAnswer ? (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      ¡Correcto! 🎉
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Identificaste correctamente esta situación. ¡Buen trabajo!
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-800">
                      Respuesta incorrecta 😔
                    </span>
                  </div>
                  <p className="text-sm text-red-700">
                    No te preocupes, aprender a detectar estafas lleva práctica. Revisá la explicación.
                  </p>
                </div>
              )}

              {/* Actual Answer Explanation */}
              <div className={`p-4 rounded-lg border-2 ${
                example.isScam 
                  ? 'bg-orange-50 border-orange-200' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {example.isScam ? (
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  )}
                  <span className={`font-semibold ${
                    example.isScam ? 'text-orange-800' : 'text-blue-800'
                  }`}>
                    {example.isScam ? '⚠️ ESTO ES UNA ESTAFA' : '✅ ESTO ES LEGÍTIMO'}
                  </span>
                </div>
                <p className={`text-sm ${
                  example.isScam ? 'text-orange-700' : 'text-blue-700'
                }`}>
                  {example.explanation}
                </p>
              </div>

              {example.redFlags && example.redFlags.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">🚩 Señales de alerta:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    {example.redFlags.map((flag, index) => (
                      <li key={index}>• {flag}</li>
                    ))}
                  </ul>
                </div>
              )}


              <div className="text-center">
                <Button onClick={handleNext} size="lg">
                  {isLastExample ? (
                    <>
                      Ver mi puntaje
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </>
                  ) : (
                    <>
                      Siguiente ejemplo
                      <ChevronRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}