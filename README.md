# 🛡️ Cuidate Online

**Plataforma educativa de ciberseguridad para familias argentinas**

Una aplicación web gratuita diseñada para enseñar conceptos fundamentales de seguridad digital de manera práctica y accesible, enfocada en el contexto argentino.

## 🛡️ Sobre el Proyecto

**Cuidate Online** es una plataforma gratuita creada por Santiago Barclay (Responsable de Ciberseguridad en Akua, profesor en UBA) para democratizar el acceso a educación de ciberseguridad práctica y relevante para el contexto argentino.

### ✨ Características

- **🎯 Gamificación**: Sistema de niveles, XP y badges para motivar el aprendizaje
- **🇦🇷 Contexto Local**: Ejemplos con Mercado Pago, AFIP, bancos argentinos
- **📚 Práctica**: Guías paso a paso con herramientas interactivas
- **🔍 Verificación de Brechas**: Búsqueda anónima de emails en brechas de datos conocidas
- **💰 Gratuita**: Sin costos, sin registro complejo, sin spam
- **🔒 Privacidad**: Datos guardados solo localmente, máxima transparencia

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

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Ejecutar en desarrollo
npm run dev

# Abrir http://localhost:3001
```

### Variables de Entorno
```bash
# Have I Been Pwned API (para verificación de brechas)
HIBP_API_KEY=tu_api_key_aqui

# Contraseña para acceder a /breach-checker
HIBP_PAGE_PASSWD=contraseña_segura

# Analytics (opcional)
VERCEL_ANALYTICS_ID=tu_analytics_id
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linting con ESLint
npm run secrets  # Escaneo de secretos con GitLeaks
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

### Sistema de Medallas
Sistema de reconocimientos que premia el progreso del usuario:
- Medallas por completar niveles y misiones
- Reconocimientos por activar medidas de seguridad
- Premios por mantener buenas prácticas
- Medallas especiales por actividad consistente

## 🔍 APIs y Servicios de Verificación de Brechas

### Have I Been Pwned (HIBP)
- **Uso**: Base de datos principal para verificación de brechas
- **Cobertura**: +13 mil millones de credenciales expuestas
- **Costo**: ~$45 USD/año por API key
- **Rate Limit**: 3 consultas por IP cada 24 horas
- **Privacidad**: [Política oficial de HIBP](https://haveibeenpwned.com/Privacy)

### ProxyNova
- **Uso**: Base de datos secundaria/desarrollo
- **Cobertura**: Colección básica de credenciales públicas
- **Costo**: Gratuito
- **Rate Limit**: Sin límites
- **Limitaciones**: Menor cobertura que HIBP

### Transparencia en el Procesamiento de Emails

**⚠️ IMPORTANTE: Cómo manejamos tu email durante la verificación**

1. **Ingresas tu email** en la misión o página /breach-checker
2. **Tu email se envía temporalmente** via HTTPS a HIBP o ProxyNova
3. **El servicio externo procesa** tu consulta y devuelve información de brechas
4. **Mostramos los resultados** inmediatamente en tu pantalla
5. **Tu email se descarta** - NO queda almacenado en nuestros servidores

**Garantías de Privacidad:**
- ✅ NO almacenamos emails en ningún servidor
- ✅ NO creamos bases de datos de consultas
- ✅ NO asociamos emails con usuarios
- ✅ Cada consulta es anónima e independiente
- ✅ Rate limiting previene abuso del servicio

## 🔒 Seguridad y Privacidad

### 🛡️ Medidas de Seguridad

**Desarrollo Seguro:**
- **Detección de Secretos**: GitLeaks pre-push hooks previenen commits accidentales de API keys y credenciales
- **Linting Estricto**: ESLint configurado para detectar vulnerabilidades de código
- **TypeScript**: Tipado fuerte reduce errores en tiempo de ejecución
- **Dependencias Actualizadas**: Monitoreo continuo de vulnerabilidades con `npm audit`

**Infraestructura en Vercel:**
- **WAF (Web Application Firewall)**: Protección automática contra ataques comunes (XSS, SQL injection, etc.)
- **DDoS Protection**: Mitigación automática de ataques de denegación de servicio
- **Rate Limiting**: Límites de velocidad para prevenir abuso de APIs
- **HTTPS Obligatorio**: Todo el tráfico encriptado con TLS 1.3
- **Headers de Seguridad**: HSTS, CSP, X-Frame-Options configurados automáticamente
- **Edge Security**: Protección distribuida a nivel global

**Arquitectura Serverless:**
- **Sin Base de Datos**: Elimina vectores de ataque comunes (SQL injection, data breaches)
- **Superficie de Ataque Mínima**: Solo archivos estáticos y funciones edge
- **Aislamiento por Request**: Cada request se ejecuta en un entorno aislado

### 🔐 Privacidad

**Zero Data Collection:**
- **Sin Analytics Invasivos**: Solo métricas básicas de Vercel (pageviews, sin PII)
- **Sin Cookies de Tracking**: No rastreamos usuarios entre sesiones
- **Sin Fingerprinting**: No recolectamos información del dispositivo
- **Sin Third-Party Trackers**: Código libre de Google Analytics, Facebook Pixel, etc.

**Almacenamiento Local:**
- **localStorage Únicamente**: Todos los datos del usuario se guardan en el navegador
- **No Enviamos Datos**: Progreso, preferencias y configuración nunca salen del dispositivo
- **Datos Exportables**: Funcionalidad para exportar/importar progreso
- **Borrado Fácil**: Clear data desde el navegador elimina todo rastro

**Transparencia:**
- **Código Abierto**: Repositorio público para auditoría completa
- **Sin Servidores Propios**: Hosting en Vercel con políticas de privacidad transparentes
- **Sin Registro de Email**: Únicamente nombre/alias local
- **Sin Logs Personales**: No almacenamos IPs, user agents, o datos identificatorios

### 🔍 Auditorías y Compliance

**Controles de Calidad:**
- **Revisión Manual**: Auditoría completa del código por profesional de ciberseguridad
- **Escaneo Automatizado**: Verificación continua de vulnerabilidades
- **Validación de Contenido**: Todo el material educativo validado profesionalmente
- **Testing de Seguridad**: Pruebas regulares de penetración básica

**Cumplimiento Legal:**
- **Ley 25.326**: Cumple con la Ley de Protección de Datos Personales de Argentina
- **Normativas Locales**: Arquitectura compatible con regulaciones argentinas de privacidad
- **Terms of Service**: Condiciones claras y transparentes
- **Privacy Policy**: Política de privacidad detallada y accesible

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
- Traducciones
- Tests automatizados

## 📞 Contacto

**Santiago Barclay**
- LinkedIn: [linkedin.com/in/santibarclay](https://www.linkedin.com/in/santibarclay/)
- Email: Para consultas profesionales vía LinkedIn


## 💰 Costos y Sustentabilidad

### Costos de Desarrollo y Operación
- **Claude Code API**: ~$35 USD (desarrollo inicial)
- **Have I Been Pwned API**: ~$45 USD/año (verificación de brechas)
- **Hosting Vercel**: $0 USD (plan gratuito)
- **Dominio**: ~$20 USD/año
- **Total anual**: ~$65 USD

### Modelo de Sustentabilidad
- **100% gratuito** para todos los usuarios
- **Autofinanciado** por compromiso social de democratizar la ciberseguridad
- **Open source** para transparencia total y contribuciones de la comunidad
- **Sin monetización** - proyecto sin fines de lucro

## 🤖 Desarrollo con IA

**Este proyecto fue desarrollado 100% con Vibe Coding usando Claude Code**, demostrando el poder de la IA para crear soluciones educativas complejas:

**Vibe Coding** es una práctica de desarrollo de software que utiliza IA, específicamente modelos de lenguaje grandes (LLMs), para generar código a partir de prompts en lenguaje natural. Enfatiza un enfoque conversacional y hands-off donde el desarrollador guía la IA en lugar de escribir código manualmente. Este método busca acelerar el desarrollo y hacer la creación de apps más accesible, particularmente para aquellos con experiencia limitada en programación.

- **Plataforma**: [Claude Code](https://claude.ai/code) by Anthropic (gracias Akua)
- **Desarrollo**: Completamente generado por IA
- **Enfoque**: Desarrollo ético y transparente con IA

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