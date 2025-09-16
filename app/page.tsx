'use client';

import Link from 'next/link';
import { Shield, CheckCircle, TrendingUp, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_NAME, CREATOR } from '@/lib/constants';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  const stats = [
    { label: "Usuarios protegidos", value: "500+", icon: Users },
    { label: "Misiones completadas", value: "2,500+", icon: CheckCircle },
    { label: "Promedio de satisfacción", value: "4.9/5", icon: Star },
    { label: "Tiempo promedio por misión", value: "8 min", icon: TrendingUp }
  ];

  const features = [
    {
      title: "Aprendé Jugando",
      description: "Sistema de niveles, puntos y medallas que hace divertido aprender seguridad digital",
      icon: "🎮"
    },
    {
      title: "Paso a Paso",
      description: "Guías detalladas con screenshots para que nunca te pierdas",
      icon: "📋"
    },
    {
      title: "Gratis y Open Source",
      description: "Acceso completo sin costo. Código abierto y auditado por la comunidad",
      icon: "🆓"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-security-blue to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <Shield className="h-8 w-8 sm:h-12 sm:w-12" />
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">{SITE_NAME}</h1>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Aprendé seguridad digital jugando
            </p>
            
            <p className="text-sm sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto opacity-90 px-4">
              Plataforma gratuita para proteger tu WhatsApp, Gmail, home banking y más. 
              Creada especialmente para familias argentinas.
            </p>
            
            <div className="space-y-3 sm:space-y-4 px-4">
              <Button asChild size="lg" className="bg-white text-security-blue hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
                <Link href="/register">
                  Empezá a cuidarte ahora
                </Link>
              </Button>
              <div>
                <Button asChild variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
                  <Link href="/dashboard">
                    ¿Ya te habías registrado?
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Santiago Bio Section */}
      <div className="bg-white py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-4 sm:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 sm:space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-security-blue/20 flex-shrink-0">
                <img 
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHsIKDu487_dQ/profile-displayphoto-shrink_800_800/B4DZTNX_xsHkAc-/0/1738612408100?e=1758153600&v=beta&t=YO5iPzp16A0qexTZoZgd7fV4OaOZyCSo-0v0lgUUcrM"
                  alt="Santiago Barclay"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Hola, soy {CREATOR.name}
                </h2>
                <p className="text-security-blue font-medium mb-3 sm:mb-4">
                  {CREATOR.role}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-lg">
                  {CREATOR.bio}
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/santibarclay/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-security-blue hover:underline text-sm sm:text-base"
                  >
                    LinkedIn
                  </a>
                  <span className="hidden sm:block text-gray-300">•</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>


      {/* Features Section */}
      <div className="bg-white py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12 px-2">
            ¿Por qué elegir {SITE_NAME}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cyber Crime Stats */}
      <div className="bg-red-50 border border-red-200 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-900 mb-6 sm:mb-8 px-2">
            Problemas de seguridad serios
          </h2>
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 max-w-2xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-left">
              <div className="flex items-start space-x-3">
                <div className="text-base sm:text-lg font-bold text-red-600 flex-shrink-0">1.</div>
                <p className="text-base sm:text-lg text-gray-700">Tu contraseña fue hackeada y no lo sabés.</p>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-left">
              <div className="flex items-start space-x-3">
                <div className="text-base sm:text-lg font-bold text-red-600 flex-shrink-0">2.</div>
                <p className="text-base sm:text-lg text-gray-700">No usás segundo factor de autenticación.</p>
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-left">
              <div className="flex items-start space-x-3">
                <div className="text-base sm:text-lg font-bold text-red-600 flex-shrink-0">3.</div>
                <p className="text-base sm:text-lg text-gray-700">No te detenés a pensar antes de hacer click o dar algún dato personal.</p>
              </div>
            </div>
          </div>
          <p className="text-base sm:text-lg text-red-800 mb-4 sm:mb-6 px-2">
            ¿Te identificás con alguna? Es momento de actuar.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
            <Link href="/register">
              Empezá tu protección ahora
            </Link>
          </Button>
        </div>
      </div>

      {/* Open Source & AI Development */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold mb-4">
            Proyecto Open Source desarrollado 100% con IA
          </h2>
          <p className="text-lg mb-4 opacity-90">
            Este sitio fue creado completamente haciendo Vibe Coding con Claude Code.
            El código es público y auditado por la comunidad.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm opacity-90">
            <a 
              href="https://github.com/santibarclay/cuidate-online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:underline"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Ver código en GitHub
            </a>
            <span className="hidden sm:block">•</span>
            <span>Transparencia total</span>
            <span className="hidden sm:block">•</span>
            <span>Contribuciones bienvenidas</span>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-security-blue text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tu seguridad digital empieza acá
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Unite a cientos de argentinos que ya están protegiendo su vida digital
          </p>
          <Button asChild size="lg" className="bg-white text-security-blue hover:bg-gray-100 text-lg px-8 py-4">
            <Link href="/register">
              Empezar gratis
            </Link>
          </Button>
          <p className="mt-4 text-sm opacity-75">
            ✓ Sin tarjeta de crédito ✓ Sin spam ✓ Privacidad garantizada
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}