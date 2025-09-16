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
    risk: "",
    steps: [],
    tips: [
      "Una contraseña 'expuesta' significa que está publicada en internet. Esto puede pasar cuando hackean un sitio web donde te registraste, caes en phishing, o un virus la roba de tu dispositivo",
      "Si reconocés alguna contraseña expuesta, cambiala inmediatamente en todos los sitios donde la uses",
      "Es mejor tener una contraseña larga y fácil de recordar que una corta y compleja",
      "Más adelante aprenderemos cómo protegernos del phishing y los virus que roban contraseñas"
    ],
    resources: []
  },
  {
    id: "activar-2fa-email",
    title: "Segundo Factor de Autenticación en correo electrónico",
    description: "Protegé tu correo electrónico con autenticación en dos pasos",
    level: 1,
    xp: 250,
    estimatedTime: "8 minutos",
    risk: "El segundo factor de autenticación (2FA) es una capa extra de seguridad que requiere dos métodos para verificar tu identidad: tu contraseña (algo que sabés) y un código temporal de tu teléfono (algo que tenés). Incluso si hackean tu contraseña, no podrán acceder sin tu teléfono.",
    steps: [],
    tips: [
      "El 2FA te protege incluso si tu contraseña es robada",
      "Guardá los códigos de respaldo en papel o en tu computadora",
      "Usá una app como Google Authenticator o Authy para generar códigos",
      "Activá 2FA primero en tu correo porque es la puerta de entrada a todas tus otras cuentas"
    ],
    resources: []
  },
  {
    id: "activar-2fa-whatsapp",
    title: "Segundo Factor de Autenticación en WhatsApp",
    description: "Protegé tu WhatsApp con verificación en dos pasos",
    level: 2,
    xp: 250,
    estimatedTime: "5 minutos",
    risk: "WhatsApp es el medio de comunicación más usado en Argentina. Si alguien accede a tu cuenta, puede hacerse pasar por vos y estafar a tus contactos. La verificación en dos pasos evita que alguien active WhatsApp en otro teléfono con tu número.",
    steps: [],
    tips: [
      "WhatsApp te pedirá el PIN cada tanto para que no te lo olvides",
      "El PIN se solicita al registrar WhatsApp en un dispositivo nuevo",
      "NUNCA compartas tu PIN de WhatsApp con nadie por teléfono",
      "Elegí un PIN que puedas recordar pero que no sea obvio (evitá fechas de nacimiento)"
    ],
    resources: []
  },
  {
    id: "detectar-estafas",
    title: "Detectá intentos de estafa",
    description: "Aprendé a identificar phishing, estafas telefónicas y sitios falsos",
    level: 1,
    xp: 400,
    estimatedTime: "12 minutos",
    risk: "Las estafas digitales crecen 300% cada año en Argentina. Los criminales usan técnicas cada vez más sofisticadas para robar dinero, datos personales y acceso a cuentas bancarias.",
    steps: [],
    tips: [
      "Nunca ingreses datos bancarios por links recibidos por email o WhatsApp",
      "Los bancos y servicios NUNCA piden datos por teléfono",
      "Ante la duda, entrá directo al sitio oficial escribiendo la URL",
      "Si algo parece demasiado bueno para ser verdad, probablemente sea una estafa"
    ],
    resources: []
  }
];

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find(mission => mission.id === id);
}

export function getMissionsByLevel(level: 1 | 2 | 3): Mission[] {
  return MISSIONS.filter(mission => mission.level === level);
}