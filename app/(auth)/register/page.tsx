'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createNewUser, saveUserProgress, UserPreferences } from '@/lib/gamification';
import { SITE_NAME } from '@/lib/constants';
import { PersonalizationFlow } from '@/components/personalization/PersonalizationFlow';

const AVATARS = [
  '👨‍💻', '👩‍💻', '🧑‍💼', '👩‍💼', '🧑‍🎓', '👩‍🎓'
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<'register' | 'personalize'>('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: AVATARS[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.name.trim()) {
        throw new Error('Por favor ingresá tu nombre');
      }
      
      if (!formData.email.trim()) {
        throw new Error('Por favor ingresá tu email');
      }
      
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        throw new Error('Por favor ingresá un email válido');
      }

      // Move to personalization step
      setStep('personalize');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonalizationComplete = (preferences: UserPreferences) => {
    // Create new user with preferences
    const newUser = createNewUser(
      formData.name.trim(),
      formData.email.trim().toLowerCase(),
      formData.avatar,
      preferences
    );

    // Save to localStorage
    saveUserProgress(newUser);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const handlePersonalizationSkip = () => {
    // Create new user without personalization
    const newUser = createNewUser(
      formData.name.trim(),
      formData.email.trim().toLowerCase(),
      formData.avatar
    );

    // Save to localStorage
    saveUserProgress(newUser);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  if (step === 'personalize') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-security-blue hover:text-blue-700 mb-6">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver al inicio</span>
            </Link>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-security-blue" />
              <h1 className="text-2xl font-bold text-gray-900">{SITE_NAME}</h1>
            </div>
          </div>
          
          <PersonalizationFlow
            onComplete={handlePersonalizationComplete}
            onSkip={handlePersonalizationSkip}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-security-blue hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al inicio</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-security-blue" />
            <h1 className="text-2xl font-bold text-gray-900">{SITE_NAME}</h1>
          </div>
          
          <h2 className="text-xl text-gray-600">
            Creá tu cuenta y empezá a protegerte
          </h2>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Registrarse</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Nombre o Alias
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-security-blue focus:border-transparent"
                  placeholder="¿Cómo te gustaría que te llamemos?"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  ⚠️ Este nombre aparecerá en el ranking público
                </p>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-security-blue focus:border-transparent"
                  placeholder="tu.email@ejemplo.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Solo se guarda localmente en tu dispositivo
                </p>
              </div>

              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Elegí tu avatar
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => handleInputChange('avatar', avatar)}
                      className={`p-4 text-2xl border-2 rounded-lg transition-colors ${
                        formData.avatar === avatar
                          ? 'border-security-blue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Empezar a cuidarme'}
              </Button>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-700 text-center">
                  🔒 Tu información se guarda únicamente en tu dispositivo.<br />
                  No recolectamos ni compartimos datos personales.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Already have account */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tenés una cuenta?{' '}
            <Link href="/dashboard" className="text-security-blue hover:underline">
              Ir al dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}