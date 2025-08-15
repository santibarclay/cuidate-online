'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, ArrowLeft, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createNewUser, saveUserProgress } from '@/lib/gamification';
import { SITE_NAME, BADGES } from '@/lib/constants';
import { BadgeCelebration } from '@/components/ui/badge-celebration';

const AVATARS = [
  '👨‍💻', '👩‍💻', '🧑‍💼', '👩‍💼', '🧑‍🎓', '👩‍🎓'
];

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    avatar: AVATARS[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showBadgeCelebration, setShowBadgeCelebration] = useState('');
  const [pendingUser, setPendingUser] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Basic validation
      if (!formData.name.trim()) {
        throw new Error('Por favor ingresá tu nombre');
      }

      // Create new user without personalization
      const newUser = createNewUser(
        formData.name.trim(),
        formData.avatar
      );

      // Save to localStorage
      saveUserProgress(newUser);

      // Show Early Adopter badge celebration first
      setPendingUser(newUser);
      setShowBadgeCelebration(BADGES.EARLY_ADOPTER.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBadgeCelebrationClose = () => {
    setShowBadgeCelebration('');
    
    if (pendingUser) {
      // Redirect to dashboard after badge celebration
      router.push('/dashboard');
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-security-blue hover:text-blue-700 mb-4 sm:mb-6 text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Volver al inicio</span>
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-security-blue" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{SITE_NAME}</h1>
          </div>
          
          <h2 className="text-lg sm:text-xl text-gray-600 px-2">
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


              {/* Avatar Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Elegí tu avatar
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => handleInputChange('avatar', avatar)}
                      className={`p-3 sm:p-4 text-xl sm:text-2xl border-2 rounded-lg transition-colors ${
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
      
      {/* Badge Celebration */}
      <BadgeCelebration
        badgeId={showBadgeCelebration}
        isVisible={!!showBadgeCelebration}
        onClose={handleBadgeCelebrationClose}
      />
    </div>
  );
}