export const SITE_NAME = "Cuidate Online";
export const SITE_URL = "https://cuidate.barclay.ar";
export const SITE_DESCRIPTION = "Plataforma gratuita creada por Santiago Barclay para aprender seguridad digital de forma práctica y divertida. Protegé tu WhatsApp, Gmail, home banking y más.";

export const CREATOR = {
  name: "Santiago Barclay",
  role: "Head of Cybersecurity en Akua, profesor en UBA",
  bio: "Durante años vi cómo la gente común sufre por no conocer medidas básicas de seguridad. Cuidate Online es mi forma de ayudarte a protegerte en el mundo digital, paso a paso."
};

export const LEVELS = {
  1: { name: "Fundamentos Críticos", xpRequired: 0, color: "#10B981" },
  2: { name: "Protección Avanzada", xpRequired: 900, color: "#0066CC" },
  3: { name: "Guardián Digital", xpRequired: 1800, color: "#7C3AED" }
} as const;

export const BADGES = {
  PRIMERA_LINEA: { id: "primera_linea", name: "Primera Línea", emoji: "🛡️", description: "Completar Nivel 1" },
  GUARDIAN_2FA: { id: "guardian_2fa", name: "Guardián 2FA", emoji: "🔐", description: "Activar 2FA en 3+ servicios" },
  CAZADOR_PHISHING: { id: "cazador_phishing", name: "Cazador de Phishing", emoji: "🎯", description: "100% en detector de phishing" },
  EN_LLAMAS: { id: "en_llamas", name: "En Llamas", emoji: "🔥", description: "7 días de streak" },
  LEYENDA: { id: "leyenda", name: "Leyenda", emoji: "💎", description: "Completar todos los niveles" },
  EARLY_ADOPTER: { id: "early_adopter", name: "Early Adopter", emoji: "🌟", description: "De los primeros 100 usuarios" }
} as const;