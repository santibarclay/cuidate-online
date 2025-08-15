export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'order';
  options: string[];
  correct: string | string[];
  explanation: string;
}

export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  "auditoria-contrasenas": [
    {
      id: "pwned-1",
      question: "¿Qué es una brecha de datos?",
      type: "multiple-choice",
      options: [
        "Cuando alguien hackea tu computadora personal",
        "Cuando una empresa es hackeada y filtran datos de usuarios",
        "Cuando olvidás tu contraseña",
        "Cuando tu celular se rompe"
      ],
      correct: "Cuando una empresa es hackeada y filtran datos de usuarios",
      explanation: "Una brecha de datos ocurre cuando criminales acceden ilegalmente a los servidores de una empresa y roban información de usuarios, incluyendo emails y contraseñas."
    },
    {
      id: "pwned-2",
      question: "Si mi email aparece en Have I Been Pwned, ¿debo cambiar todas mis contraseñas?",
      type: "true-false",
      options: ["Verdadero", "Falso"],
      correct: "Falso",
      explanation: "No necesariamente todas, pero sí debés pensar qué contraseña usabas en ese sitio comprometido y cambiarla. Es por eso que es importante usar contraseñas distintas para cada sitio en el que nos registramos. Sé que eso es imposible, pero más adelante aprenderemos a hacerlo usando un password manager."
    },
    {
      id: "pwned-3",
      question: "¿Cuál de estas contraseñas es más segura?",
      type: "multiple-choice",
      options: [
        "argentina2024",
        "123456789",
        "miNombre123",
        "K8#mP9$xL2@vN5"
      ],
      correct: "K8#mP9$xL2@vN5",
      explanation: "Una contraseña segura debe ser larga, aleatoria, y combinar letras mayúsculas, minúsculas, números y símbolos. Las contraseñas predecibles son fáciles de hackear."
    }
  ],
  "activar-2fa-gmail": [
    {
      id: "2fa-1",
      question: "¿Qué significa 2FA?",
      type: "multiple-choice",
      options: [
        "Two Factor Authentication (Autenticación de Dos Factores)",
        "Fast Access (Acceso Rápido)",
        "Second Password (Segunda Contraseña)",
        "Security Code (Código de Seguridad)"
      ],
      correct: "Two Factor Authentication (Autenticación de Dos Factores)",
      explanation: "2FA significa que necesitás dos cosas para acceder: algo que sabés (tu contraseña) y algo que tenés (tu celular o app autenticadora)."
    },
    {
      id: "2fa-2",
      question: "¿Por qué SMS no es el método de 2FA más seguro?",
      type: "multiple-choice",
      options: [
        "Es muy lento",
        "Es caro",
        "Puede ser interceptado por SIM Swapping",
        "No funciona en Argentina"
      ],
      correct: "Puede ser interceptado por SIM Swapping",
      explanation: "Los criminales pueden engañar a tu operadora móvil para transferir tu número a su SIM y recibir tus códigos SMS. Por eso es mejor usar una app autenticadora."
    },
    {
      id: "2fa-3",
      question: "¿Qué son los códigos de respaldo?",
      type: "multiple-choice",
      options: [
        "Códigos para recuperar acceso si perdés tu celular",
        "Contraseñas adicionales",
        "Números de teléfono alternativos",
        "Aplicaciones de seguridad"
      ],
      correct: "Códigos para recuperar acceso si perdés tu celular",
      explanation: "Los códigos de respaldo te permiten acceder a tu cuenta si perdés tu celular o no podés usar tu app autenticadora. Guardalos en un lugar seguro."
    }
  ],
  "password-manager": [
    {
      id: "pm-1",
      question: "¿Cuál es la principal ventaja de un password manager?",
      type: "multiple-choice",
      options: [
        "Es gratis",
        "Genera y recuerda contraseñas únicas para cada cuenta",
        "Acelera tu navegación",
        "Bloquea publicidades"
      ],
      correct: "Genera y recuerda contraseñas únicas para cada cuenta",
      explanation: "Un password manager te permite tener contraseñas diferentes y súper seguras para cada cuenta, sin tener que recordarlas. Solo necesitás recordar una Master Password."
    },
    {
      id: "pm-2",
      question: "¿Cuál sería una buena Master Password?",
      type: "multiple-choice",
      options: [
        "12345678",
        "password",
        "MiPerroFirulais2024!",
        "argentina"
      ],
      correct: "MiPerroFirulais2024!",
      explanation: "Una buena Master Password es una frase memorable para vos pero difícil de adivinar, con mayúsculas, números y símbolos. Debe ser larga pero fácil de recordar."
    },
    {
      id: "pm-3",
      question: "¿Es seguro guardar contraseñas en el navegador?",
      type: "true-false",
      options: ["Verdadero", "Falso"],
      correct: "Falso",
      explanation: "Aunque es mejor que reutilizar contraseñas, los password managers dedicados como Bitwarden son más seguros, ofrecen mejor cifrado y funcionan en todos tus dispositivos."
    }
  ]
};

export function getQuizQuestions(missionId: string): QuizQuestion[] {
  return QUIZ_QUESTIONS[missionId] || [];
}