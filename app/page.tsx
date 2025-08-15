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
      description: "Sistema de niveles, XP y badges que hace divertido aprender seguridad digital",
      icon: "🎮"
    },
    {
      title: "Ejemplos Argentinos",
      description: "Casos reales de phishing con Mercado Pago, AFIP, bancos argentinos y más",
      icon: "🇦🇷"
    },
    {
      title: "Paso a Paso",
      description: "Guías detalladas con screenshots para que nunca te pierdas",
      icon: "📋"
    },
    {
      title: "Gratis Siempre",
      description: "Acceso completo sin costo. Mi compromiso con la educación digital",
      icon: "🆓"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-security-blue to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Shield className="h-12 w-12" />
              <h1 className="text-4xl md:text-5xl font-bold">{SITE_NAME}</h1>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Aprendé seguridad digital jugando
            </p>
            
            <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
              Plataforma gratuita para proteger tu WhatsApp, Gmail, home banking y más. 
              Creada especialmente para familias argentinas.
            </p>
            
            <Button asChild size="lg" className="bg-white text-security-blue hover:bg-gray-100 text-lg px-8 py-4">
              <Link href="/register">
                Empezá a cuidarte ahora
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Santiago Bio Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 bg-gradient-to-br from-security-blue to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                SB
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Hola, soy {CREATOR.name}
                </h2>
                <p className="text-security-blue font-medium mb-4">
                  {CREATOR.role}
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {CREATOR.bio}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/santibarclay/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-security-blue hover:underline"
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

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cuidando a la comunidad argentina
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <stat.icon className="h-8 w-8 text-security-blue mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Por qué elegir {SITE_NAME}?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Cyber Crime Stats */}
      <div className="bg-red-50 border border-red-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-red-900 mb-6">
            La Realidad en Argentina
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
              <p className="text-gray-600">de los argentinos usa contraseñas débiles</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-red-600 mb-2">42%</div>
              <p className="text-gray-600">fue víctima de algún tipo de fraude digital</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-red-600 mb-2">73%</div>
              <p className="text-gray-600">no usa autenticación en dos pasos</p>
            </div>
          </div>
          <p className="text-lg text-red-800 mb-6">
            No seas parte de estas estadísticas. Protegete hoy.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="/register">
              Empezá tu protección ahora
            </Link>
          </Button>
        </div>
      </div>

      {/* AI Development Notice */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold mb-4">
            Desarrollado 100% con IA
          </h2>
          <p className="text-lg mb-4 opacity-90">
            Este sitio fue creado completamente usando Vibe Coding con Claude Code. Costo: ~$5 USD en tokens.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm opacity-75">
            <span>Powered by <a href="https://akua.la" target="_blank" rel="noopener noreferrer" className="underline font-medium">Akua</a></span>
            <span className="hidden sm:block">•</span>
            <span>Built with <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer" className="underline font-medium">Claude Code</a></span>
          </div>
          <div className="mt-4 p-3 bg-white/10 rounded-lg text-sm">
            <p>⚠️ Paradoja: Un sitio sobre ciberseguridad creado por IA. ¿Qué riesgos implica esto?</p>
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
              Registrarme gratis
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