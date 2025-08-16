'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Chrome, Smartphone, Mail, Monitor, ChevronRight, X } from 'lucide-react';
import { UserPreferences } from '@/lib/gamification';

interface PersonalizationFlowProps {
  onComplete: (preferences: UserPreferences) => void;
  onSkip: () => void;
  initialPreferences?: UserPreferences;
}

export function PersonalizationFlow({ onComplete, onSkip, initialPreferences }: PersonalizationFlowProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UserPreferences>(
    initialPreferences || {
      browser: null,
      device: null,
      email: null,
      os: null,
      isPersonalized: false
    }
  );

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete({ ...preferences, isPersonalized: true });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return preferences.browser !== null;
      case 2:
        return preferences.device !== null;
      case 3:
        return preferences.email !== null;
      case 4:
        return preferences.os !== null;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Chrome className="h-6 w-6 sm:h-8 sm:w-8 text-security-blue" />
              <h3 className="text-lg sm:text-xl font-semibold">¿Cuál es tu navegador principal?</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, browser: 'chrome' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.browser === 'chrome'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Google Chrome</span>
                <p className="text-sm text-gray-600 mt-1">Guías específicas para Chrome</p>
              </button>
              
              <button
                onClick={() => setPreferences({ ...preferences, browser: 'firefox' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.browser === 'firefox'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Otro navegador</span>
                <p className="text-sm text-gray-600 mt-1">Edge, Safari, Firefox, etc.</p>
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-security-blue" />
              <h3 className="text-lg sm:text-xl font-semibold">¿Qué tipo de celular tenés?</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, device: 'android' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.device === 'android'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Android</span>
                <p className="text-sm text-gray-600 mt-1">Samsung, Xiaomi, Motorola, etc.</p>
              </button>
              
              <button
                onClick={() => setPreferences({ ...preferences, device: 'ios' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.device === 'ios'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">iPhone (iOS)</span>
                <p className="text-sm text-gray-600 mt-1">iPhone y iPad</p>
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-security-blue" />
              <h3 className="text-lg sm:text-xl font-semibold">¿Cuál es tu correo principal?</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, email: 'gmail' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.email === 'gmail'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Gmail (@gmail.com)</span>
                <p className="text-sm text-gray-600 mt-1">Guías específicas para Gmail</p>
              </button>
              
              <button
                onClick={() => setPreferences({ ...preferences, email: 'outlook' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.email === 'outlook'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Outlook/Hotmail</span>
                <p className="text-sm text-gray-600 mt-1">@outlook.com, @hotmail.com</p>
              </button>
              
              <button
                onClick={() => setPreferences({ ...preferences, email: 'other' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.email === 'other'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Otro proveedor</span>
                <p className="text-sm text-gray-600 mt-1">Yahoo, empresa, otros</p>
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-security-blue" />
              <h3 className="text-lg sm:text-xl font-semibold">¿Qué sistema operativo usás?</h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setPreferences({ ...preferences, os: 'windows' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.os === 'windows'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Windows</span>
                <p className="text-sm text-gray-600 mt-1">Windows 10, 11</p>
              </button>
              
              <button
                onClick={() => setPreferences({ ...preferences, os: 'mac' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.os === 'mac'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">macOS</span>
                <p className="text-sm text-gray-600 mt-1">Mac, iMac, MacBook</p>
              </button>

              <button
                onClick={() => setPreferences({ ...preferences, os: 'linux' })}
                className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-colors ${
                  preferences.os === 'linux'
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">Linux</span>
                <p className="text-sm text-gray-600 mt-1">Ubuntu, Debian, otras distros</p>
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1">
            <CardTitle className="text-xl sm:text-2xl">Personalizar experiencia</CardTitle>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Respondé estas preguntas para recibir guías específicas para tus herramientas
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 self-end sm:self-start"
          >
            <X className="h-4 w-4 mr-2" />
            Omitir
          </Button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex space-x-2 mt-4">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`h-2 flex-1 rounded ${
                num <= step ? 'bg-security-blue' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex flex-col sm:flex-row sm:justify-between pt-6 space-y-3 sm:space-y-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="w-full sm:w-auto"
          >
            Anterior
          </Button>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="secondary"
              onClick={onSkip}
              className="text-gray-600 w-full sm:w-auto text-xs sm:text-sm"
            >
              Omitir personalización
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="bg-security-blue hover:bg-blue-700 w-full sm:w-auto"
            >
              {step === 4 ? 'Completar' : 'Siguiente'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}