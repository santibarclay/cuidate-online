export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'order';
  options: string[];
  correct: string | string[];
  explanation: string;
}

export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  "cuidemos-contrasenas": [
    {
      id: "pwd-1",
      question: "¿Qué significa que una contraseña fue 'hackeada'?",
      type: "multiple-choice",
      options: [
        "Que alguien la adivinó mirando mi pantalla",
        "Que fue expuesta en una brecha de datos de alguna empresa",
        "Que es muy fácil de recordar",
        "Que la uso en muchos sitios"
      ],
      correct: "Que fue expuesta en una brecha de datos de alguna empresa",
      explanation: "Una contraseña 'hackeada' significa que fue expuesta públicamente cuando criminales atacaron los servidores de una empresa y robaron información de usuarios."
    },
    {
      id: "pwd-2",
      question: "Si tu contraseña fue comprometida, ¿qué hacer?",
      type: "multiple-choice",
      options: [
        "Seguir usándola si es segura",
        "Cambiarla solo en el sitio donde fue comprometida",
        "Cambiarla inmediatamente en TODOS los sitios donde la uses",
        "Esperar a que me hackeen para cambiarla"
      ],
      correct: "Cambiarla inmediatamente en TODOS los sitios donde la uses",
      explanation: "Si una contraseña fue comprometida, debe ser cambiada en todos los sitios donde la uses, porque los criminales probablemente intentarán usarla en otros servicios."
    },
    {
      id: "pwd-3",
      question: "¿Cuántas contraseñas hackeadas es aceptable tener?",
      type: "multiple-choice",
      options: [
        "1-2 está bien",
        "Hasta 5 es normal",
        "Ninguna",
        "No importa si son sitios poco importantes"
      ],
      correct: "Ninguna",
      explanation: "No es aceptable tener ninguna contraseña hackeada activa. Todas las contraseñas comprometidas deben ser cambiadas inmediatamente, sin importar qué tan 'poco importante' parezca el sitio."
    }
  ],
  "activar-2fa-email-whatsapp": [
    {
      id: "2fa-1",
      question: "¿Qué hace el 2FA (autenticación en dos pasos)?",
      type: "multiple-choice",
      options: [
        "Te hace recordar dos contraseñas",
        "Requiere algo que sabés (contraseña) y algo que tenés (celular)",
        "Duplica la velocidad de acceso",
        "Te permite usar la misma contraseña en dos sitios"
      ],
      correct: "Requiere algo que sabés (contraseña) y algo que tenés (celular)",
      explanation: "El 2FA agrega una capa extra de seguridad: incluso si roban tu contraseña, necesitan también tu celular para acceder a tu cuenta."
    },
    {
      id: "2fa-2",
      question: "¿Cuándo WhatsApp te pide el PIN de verificación en dos pasos?",
      type: "multiple-choice",
      options: [
        "Cada vez que abrís la app",
        "Solo al registrar WhatsApp en un dispositivo nuevo",
        "Una vez por semana",
        "Solo si te hackean"
      ],
      correct: "Solo al registrar WhatsApp en un dispositivo nuevo",
      explanation: "WhatsApp solo te pedirá el PIN cuando intentes registrar tu número en un dispositivo diferente, no para uso diario."
    },
    {
      id: "2fa-3",
      question: "¿Qué NUNCA deberías hacer con tu PIN de WhatsApp?",
      type: "multiple-choice",
      options: [
        "Anotarlo en papel",
        "Compartirlo por teléfono con alguien que dice ser de WhatsApp",
        "Usarlo para registrar WhatsApp en tu celular nuevo",
        "Recordarlo de memoria"
      ],
      correct: "Compartirlo por teléfono con alguien que dice ser de WhatsApp",
      explanation: "NUNCA compartas tu PIN por teléfono. WhatsApp JAMÁS te llamará pidiendo códigos. Es una estafa común para robarte la cuenta."
    }
  ],
  "detectar-estafas": [
    {
      id: "scam-1",
      question: "¿Cuál de estos emails es probablemente phishing?",
      type: "multiple-choice",
      options: [
        "Email de tu banco con tu nombre completo y datos correctos",
        "Email urgente de 'Mercado Pago' pidiendo actualizar datos YA",
        "Newsletter que recibís habitualmente",
        "Confirmación de compra que acabás de hacer"
      ],
      correct: "Email urgente de 'Mercado Pago' pidiendo actualizar datos YA",
      explanation: "Los emails de phishing crean urgencia artificial y piden datos personales. Los servicios legítimos nunca piden datos urgentemente por email."
    },
    {
      id: "scam-2",
      question: "Te llaman diciendo ser del banco y piden tu CVV. ¿Qué hacés?",
      type: "multiple-choice",
      options: [
        "Se lo doy si conocen mis datos",
        "Les digo que los llamo de vuelta al número oficial del banco",
        "Pregunto primero mi saldo para verificar",
        "Cuelgo y no hago nada"
      ],
      correct: "Les digo que los llamo de vuelta al número oficial del banco",
      explanation: "Los bancos NUNCA piden datos por teléfono. Siempre colgá y llamá vos al número oficial del banco para verificar si realmente necesitan algo."
    },
    {
      id: "scam-3",
      question: "Recibís un WhatsApp: 'Hola, cambié de número, soy tu primo. Necesito que me transfieras urgente'. ¿Qué hacés?",
      type: "multiple-choice",
      options: [
        "Transfiero inmediatamente para ayudar",
        "Llamo al número viejo de mi primo para confirmar",
        "Pido una foto como prueba",
        "Pregunto datos familiares para verificar"
      ],
      correct: "Llamo al número viejo de mi primo para confirmar",
      explanation: "La estafa del 'cambié de número' es muy común. Siempre verificá por otro medio (llamada al número original) antes de transferir dinero."
    }
  ]
};

export function getQuizQuestions(missionId: string): QuizQuestion[] {
  return QUIZ_QUESTIONS[missionId] || [];
}