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
- Auditoría de Contraseñas (200 XP)
- Activar 2FA en Gmail (300 XP) 
- Configurar Password Manager (400 XP)

**Próximamente:**
- Nivel 2: Protección contra phishing argentino, SIM Swapping
- Nivel 3: Seguridad en home banking, backup seguro

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

### Badges
- 🛡️ **Primera Línea**: Completar Nivel 1
- 🔐 **Guardián 2FA**: Activar 2FA en servicios
- 🎯 **Cazador de Phishing**: 100% en detector
- 🔥 **En Llamas**: 7 días de streak
- 💎 **Leyenda**: Completar todos los niveles

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

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Reconocimientos

- Comunidad argentina de ciberseguridad
- Estudiantes de la UBA que inspiraron este proyecto
- Todos los usuarios que reportan bugs y sugieren mejoras

---

**¡Protegé tu vida digital, paso a paso!** 🛡️

Hecho con ❤️ en Argentina por Santiago Barclay