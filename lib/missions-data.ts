export interface Mission {
  id: string;
  title: string;
  description: string;
  level: 1 | 2 | 3;
  xp: number;
  estimatedTime: string;
  risk: string;
  steps: string[];
  tips: string[];
  resources: { title: string; url: string }[];
}

export const MISSIONS: Mission[] = [
  {
    id: "cuidemos-contrasenas",
    title: "Cuidemos nuestras contraseñas",
    description: "Verificá si tus contraseñas fueron hackeadas y aprendé qué hacer al respecto",
    level: 1,
    xp: 200,
    estimatedTime: "5 minutos",
    risk: "En Argentina, el 85% de las personas usa contraseñas débiles y el 42% fue víctima de algún tipo de fraude digital. Las contraseñas comprometidas son la puerta de entrada más común para criminales.",
    steps: [
      "Verificá si tus contraseñas fueron comprometidas",
      "Si encontrás contraseñas hackeadas, cambialas inmediatamente",
      "Nunca reutilices contraseñas entre diferentes sitios",
      "Creá contraseñas únicas y seguras para cada cuenta"
    ],
    tips: [
      "Una contraseña 'hackeada' significa que fue expuesta en una brecha de datos de alguna empresa",
      "Si reconocés alguna contraseña comprometida, cambiala inmediatamente en todos los sitios donde la uses",
      "Las contraseñas más seguras combinan mayúsculas, minúsculas, números y símbolos",
      "Es mejor tener una contraseña larga y fácil de recordar que una corta y compleja"
    ],
    resources: [
      { title: "Google Password Checkup", url: "https://passwords.google.com/checkup/start" },
      { title: "Cómo crear contraseñas seguras", url: "https://support.google.com/accounts/answer/32040" }
    ]
  },
  {
    id: "activar-2fa-email-whatsapp",
    title: "Activá el 2FA en tu correo y WhatsApp",
    description: "Protegé tus cuentas más importantes con autenticación en dos pasos",
    level: 1,
    xp: 300,
    estimatedTime: "10 minutos",
    risk: "Tu email es la puerta de entrada a todas tus otras cuentas. WhatsApp se usa cada vez más para estafas. El 73% de los argentinos no usa 2FA, quedando vulnerables a hackeos que se previenen fácilmente.",
    steps: [
      "Activá 2FA en tu correo electrónico principal",
      "Activá verificación en dos pasos en WhatsApp",
      "Anotá y guardá todos los códigos de respaldo",
      "Probá que funcione correctamente"
    ],
    tips: [
      "El 2FA te protege incluso si tu contraseña es robada",
      "WhatsApp te pedirá el PIN solo al registrar la app en un dispositivo nuevo",
      "NUNCA compartas tu PIN de WhatsApp con nadie por teléfono",
      "Guardá los códigos de respaldo en papel o en tu computadora"
    ],
    resources: [
      { title: "Verificación en 2 pasos - Gmail", url: "https://support.google.com/accounts/answer/185839" },
      { title: "Verificación en dos pasos - WhatsApp", url: "https://faq.whatsapp.com/1086027885177245" }
    ]
  },
  {
    id: "detectar-estafas",
    title: "Detectá intentos de estafa",
    description: "Aprendé a identificar phishing, estafas telefónicas y sitios falsos",
    level: 1,
    xp: 400,
    estimatedTime: "12 minutos",
    risk: "Las estafas digitales crecen 300% cada año en Argentina. Los criminales usan técnicas cada vez más sofisticadas para robar dinero, datos personales y acceso a cuentas bancarias.",
    steps: [
      "Aprendé a identificar emails de phishing",
      "Reconocé estafas telefónicas comunes",
      "Detectá estafas por WhatsApp",
      "Verificá la autenticidad de sitios web"
    ],
    tips: [
      "Nunca ingreses datos bancarios por links recibidos por email o WhatsApp",
      "Los bancos y servicios NUNCA piden datos por teléfono",
      "Ante la duda, entrá directo al sitio oficial escribiendo la URL",
      "Si algo parece demasiado bueno para ser verdad, probablemente sea una estafa"
    ],
    resources: [
      { title: "Cómo identificar phishing - Google", url: "https://support.google.com/mail/answer/9157281" },
      { title: "Central de Ciberseguridad - Argentina.gob.ar", url: "https://www.argentina.gob.ar/jefatura/innovacion-publica/gobierno-digital/ciberseguridad" }
    ]
  }
];

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find(mission => mission.id === id);
}

export function getMissionsByLevel(level: 1 | 2 | 3): Mission[] {
  return MISSIONS.filter(mission => mission.level === level);
}