# Cuidate Online

Plataforma educativa gamificada para enseñar seguridad digital a familias argentinas.

## 🛡️ Sobre el Proyecto

**Cuidate Online** es una plataforma gratuita creada por Santiago Barclay (Head of Cybersecurity en Akua, profesor en UBA) para democratizar el acceso a educación de ciberseguridad práctica y relevante para el contexto argentino.

### ✨ Características

- **Gamificación**: Sistema de niveles, XP y badges
- **Contexto Local**: Ejemplos con Mercado Pago, AFIP, bancos argentinos
- **Práctica**: Guías paso a paso con screenshots
- **Gratuita**: Sin costos, sin registro complejo, sin spam
- **Privacidad**: Datos guardados solo localmente

### 🎯 Misiones Disponibles

**Nivel 1 - Fundamentos Críticos:**
Misiones interactivas que enseñan los conceptos básicos de seguridad digital.

**Próximamente:**
- Nivel 2: Protección avanzada 
- Nivel 3: Seguridad bancaria y datos personales

## 🚀 Instalación y Desarrollo

### Requisitos
- Node.js 18+
- npm o yarn

### Configuración Local
```bash
# Clonar el repositorio
git clone https://github.com/santibarclay/cuidate-online.git
cd cuidate-online

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Abrir http://localhost:3000
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
```

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Almacenamiento**: localStorage (sin base de datos)
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion
- **Despliegue**: Vercel

## 📁 Estructura del Proyecto

```
/app
  /(auth)/register      # Registro de usuario
  /(dashboard)          # Dashboard y páginas principales
    /dashboard          # Panel principal
    /missions/[id]      # Detalle de misiones
    /leaderboard        # Ranking de usuarios
    /profile            # Perfil del usuario
  /about               # Sobre el proyecto
  /resources           # Recursos y emergencias
/components
  /ui                  # Componentes básicos
  /missions            # Componentes de misiones
  /dashboard           # Componentes del dashboard
  /layout              # Header, footer
/lib
  /constants.ts        # Configuraciones del sitio
  /missions-data.ts    # Datos de las misiones
  /quiz-questions.ts   # Preguntas de los quizzes
  /gamification.ts     # Sistema de XP y badges
```

## 🎮 Sistema de Gamificación

### Niveles
- **Nivel 1**: 0-899 XP (Fundamentos Críticos)
- **Nivel 2**: 900-1799 XP (Protección Avanzada)  
- **Nivel 3**: 1800+ XP (Guardián Digital)

### Sistema de Badges
Sistema de reconocimientos que premia el progreso del usuario:
- Badges por completar niveles y misiones
- Reconocimientos por activar medidas de seguridad
- Premios por mantener buenas prácticas
- Badges especiales por actividad consistente

## 🔒 Privacidad

- **Sin tracking**: No usamos analytics invasivos
- **Datos locales**: Todo se guarda en localStorage del navegador
- **Sin servidor**: No almacenamos información personal
- **Exportable**: Podés descargar todos tus datos

## 🤝 Contribuir

Este proyecto está abierto a contribuciones de la comunidad:

1. Fork el repositorio
2. Creá una branch para tu feature (`git checkout -b feature/nueva-mision`)
3. Commit tus cambios (`git commit -m 'Agregar nueva misión'`)
4. Push a la branch (`git push origin feature/nueva-mision`)
5. Abrí un Pull Request

### Ideas para Contribuir
- Nuevas misiones educativas
- Mejoras en UX/UI
- Ejemplos más argentinos
- Traducciones
- Tests automatizados

## 📞 Contacto

**Santiago Barclay**
- LinkedIn: [linkedin.com/in/santibarclay](https://www.linkedin.com/in/santibarclay/)
- Email: Para consultas profesionales vía LinkedIn


## 🤖 Desarrollo con IA

**Este proyecto fue desarrollado 100% con Vibe Coding usando Claude Code**, demostrando el poder de la IA para crear soluciones educativas complejas:

**Vibe Coding** es una práctica de desarrollo de software que utiliza IA, específicamente modelos de lenguaje grandes (LLMs), para generar código a partir de prompts en lenguaje natural. Enfatiza un enfoque conversacional y hands-off donde el desarrollador guía la IA en lugar de escribir código manualmente. Este método busca acelerar el desarrollo y hacer la creación de apps más accesible, particularmente para aquellos con experiencia limitada en programación.

- **Plataforma**: [Claude Code](https://claude.ai/code) by Anthropic
- **Desarrollo**: Completamente generado por IA
- **Enfoque**: Desarrollo ético y transparente con IA

### ⚠️ **Reflexión sobre Riesgos de IA**

Un sitio sobre **ciberseguridad** creado enteramente por IA ilustra una paradoja importante:

- ✅ **Beneficio**: IA democratiza la creación de herramientas educativas
- ⚠️ **Riesgo**: Dependencia de IA puede introducir vulnerabilidades desconocidas
- 🔍 **Lección**: Debemos auditar código generado por IA con el mismo rigor que código humano

## 🙏 Agradecimientos

### Sponsors y Colaboradores
- **[Akua](https://akua.la)** - Por facilitar los tokens de Claude que hicieron posible este MVP
- **Anthropic** - Por Claude Code y la tecnología que democratiza el desarrollo
- **Vercel** - Por la plataforma de hosting gratuita

### Inspiración
- Comunidad argentina de ciberseguridad
- Estudiantes de la UBA que inspiraron este proyecto  
- Familias argentinas que necesitan protección digital
- Todos los usuarios que reportan bugs y sugieren mejoras

### Transparencia
- **Código 100% generado por IA**: Claude 3.5 Sonnet via Claude Code
- **Auditoría humana**: Revisión completa de seguridad por Santiago Barclay
- **Contenido educativo**: Validado por experiencia profesional en ciberseguridad

---

**¡Protegé tu vida digital, paso a paso!** 🛡️

*Built with [Claude Code](https://claude.ai/code)*