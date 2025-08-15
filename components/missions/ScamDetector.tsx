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
    redFlags: ['Urgencia artificial', 'URL sospechosa', 'Amenazas de bloqueo', 'Dominio falso']
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
    content: '📞 Te llama tu banco:\n\n"Estimado cliente, le informamos que debe acercarse a la sucursal para renovar su tarjeta antes del vencimiento. El horario es de 9 a 15hs. Gracias."',
    isScam: false,
    explanation: 'Solo informa, no pide datos sensibles',
    redFlags: []
  },
  // WHATSAPP
  {
    id: 'whatsapp-1',
    type: 'whatsapp',
    content: '💬 WhatsApp de número desconocido:\n\n"Hola! Cambié de número, soy tu primo Juan. Me urgeeee que me transfieras $20.000 que mañana te devuelvo. Es una emergencia, no puedo llamarte ahora. Mi CBU: 1234567890"',
    isScam: true,
    explanation: 'Estafa clásica del "cambié de número"',
    redFlags: ['Número nuevo', 'Pide dinero urgente', 'No puede verificar identidad']
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
    id: 'whatsapp-3',
    type: 'whatsapp',
    content: '💬 WhatsApp de número desconocido:\n\n"🎉 ¡FELICITACIONES! Fuiste seleccionado para ganar $500.000 en el sorteo de Coca-Cola. Para reclamar tu premio, hacé click acá y completá tus datos: http://sorteo-coca-cola.com.ar"',
    isScam: true,
    explanation: 'Sorteos no solicitados siempre son estafas',
    redFlags: ['Premio no solicitado', 'URL sospechosa', 'Pide datos personales']
  },
  // WEBSITES
  {
    id: 'website-1',
    type: 'website',
    content: '🌐 Estás navegando y aparece:\n\nURL: https://homebanking-santander.secure-login.com.ar\n\n"Ingrese su usuario y clave para acceder a Santander Río Online Banking"\n\n[Sin candado SSL visible]',
    isScam: true,
    explanation: 'Sitio falso que simula ser del banco',
    redFlags: ['URL sospechosa', 'Sin SSL', 'Dominio no oficial']
  },
  {
    id: 'website-2',
    type: 'website',
    content: '🌐 Estás navegando:\n\nURL: https://www.santander.com.ar/\n\n[Candado verde SSL]\n"Banca por Internet - Santander"\n\nTodos los elementos visuales coinciden con el banco.',
    isScam: false,
    explanation: 'Sitio oficial del banco con SSL',
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
                className={`${hasAnswered ? getAnswerColor(true) : 'bg-red-600 hover:bg-red-700'} min-w-[120px]`}
              >
                {hasAnswered && answers[example.id] === true && (
                  answers[example.id] === example.isScam ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 mr-2" />
                  )
                )}
                SÍ, es estafa
              </Button>
              
              <Button
                onClick={() => handleAnswer(false)}
                disabled={hasAnswered}
                size="lg"
                className={`${hasAnswered ? getAnswerColor(false) : 'bg-green-600 hover:bg-green-700'} min-w-[120px]`}
              >
                {hasAnswered && answers[example.id] === false && (
                  answers[example.id] === example.isScam ? (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 mr-2" />
                  )
                )}
                NO, es legítimo
              </Button>
            </div>
          </div>

          {showExplanation && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                example.isScam 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {example.isScam ? (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  <span className={`font-semibold ${
                    example.isScam ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {example.isScam ? '⚠️ ESTO ES UNA ESTAFA' : '✅ ESTO ES LEGÍTIMO'}
                  </span>
                </div>
                <p className={`text-sm ${
                  example.isScam ? 'text-red-700' : 'text-green-700'
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