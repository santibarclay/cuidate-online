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
    id: "auditoria-contrasenas",
    title: "Auditoría de Contraseñas",
    description: "Descubrí si tus contraseñas fueron comprometidas en alguna brecha de datos",
    level: 1,
    xp: 200,
    estimatedTime: "5 minutos",
    risk: "En Argentina, el 60% de las personas usan la misma contraseña para múltiples cuentas. Si una empresa sufre una brecha (como pasó con LinkedIn, Yahoo, o Facebook), los criminales pueden usar esa contraseña para acceder a tu Gmail, home banking, o WhatsApp.",
    steps: [
      "Andá a la página Have I Been Pwned (haveibeenpwned.com)",
      "Ingresá tu dirección de email principal",
      "Revisá si aparece en alguna brecha de datos",
      "Repetí el proceso con otros emails que uses"
    ],
    tips: [
      "Si tu email aparece comprometido, no entrés en pánico. Es normal y le pasa a millones de personas.",
      "Podés entrar a chrome://password-manager/passwords si usás Chrome (o edge://password-manager/passwords en Edge) y ver si en alguno de esos hackeos tu contraseña fue expuesta.",
      "Es importante pensar en qué otros sitios usamos esa misma contraseña y cambiarla.",
      "Have I Been Pwned es una página confiable creada por un experto en seguridad reconocido mundialmente."
    ],
    resources: [
      { title: "Have I Been Pwned", url: "https://haveibeenpwned.com" },
      { title: "¿Qué hacer si mi email fue comprometido?", url: "https://haveibeenpwned.com/FAQs" }
    ]
  },
  {
    id: "activar-2fa-gmail",
    title: "Activar 2FA en Gmail",
    description: "Protegé tu cuenta de Gmail con autenticación en dos pasos",
    level: 1,
    xp: 300,
    estimatedTime: "10 minutos",
    risk: "Tu Gmail es la puerta de entrada a todas tus otras cuentas. Si alguien accede a tu email, puede resetear las contraseñas de tu home banking, MercadoPago, WhatsApp, y más. En Argentina, 8 de cada 10 hackeos empiezan por una cuenta de email comprometida.",
    steps: [
      "Andá a myaccount.google.com desde tu computadora",
      "Hacé click en 'Seguridad' en el menú de la izquierda",
      "Buscá 'Verificación en 2 pasos' y hacé click",
      "Seguí el asistente para configurarlo con tu número de teléfono",
      "Descargá Google Authenticator en tu celular para mayor seguridad",
      "Guardá los códigos de respaldo en un lugar seguro"
    ],
    tips: [
      "Google Authenticator es más seguro que SMS, porque no depende de tu operadora móvil.",
      "Guardá los códigos de respaldo en tu computadora o anotados en papel.",
      "Si tenés iPhone, podés usar el autenticador integrado en Configuración > Contraseñas."
    ],
    resources: [
      { title: "Verificación en 2 pasos - Google", url: "https://support.google.com/accounts/answer/185839" },
      { title: "Google Authenticator", url: "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" }
    ]
  },
  {
    id: "password-manager",
    title: "Configurar un Password Manager",
    description: "Instalá y configurá Bitwarden para generar y guardar contraseñas seguras",
    level: 1,
    xp: 400,
    estimatedTime: "15 minutos",
    risk: "Recordar contraseñas únicas y seguras para 50+ cuentas es imposible. Por eso la gente reutiliza contraseñas (como '123456' o 'argentina2024'). Un password manager genera contraseñas aleatorias imposibles de hackear y las recuerda por vos.",
    steps: [
      "Andá a bitwarden.com y creá una cuenta gratuita",
      "Elegí una 'Master Password' fuerte y única (la única que vas a tener que recordar)",
      "Instalá la extensión de Bitwarden en tu navegador",
      "Instalá la app de Bitwarden en tu celular",
      "Importá las contraseñas que ya tenés guardadas en tu navegador",
      "Generá una contraseña nueva y segura para una cuenta importante"
    ],
    tips: [
      "Tu Master Password debe ser una frase fácil de recordar pero difícil de adivinar, como 'MiPerroNegro2024!'",
      "Bitwarden funciona en todos los dispositivos y navegadores gratuitamente.",
      "No tengas miedo de olvidar contraseñas viejas. Bitwarden las recuerda todas."
    ],
    resources: [
      { title: "Bitwarden", url: "https://bitwarden.com" },
      { title: "Cómo crear una Master Password segura", url: "https://bitwarden.com/help/create-a-strong-master-password/" }
    ]
  }
];

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find(mission => mission.id === id);
}

export function getMissionsByLevel(level: 1 | 2 | 3): Mission[] {
  return MISSIONS.filter(mission => mission.level === level);
}