'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BADGES } from '@/lib/constants';

interface BadgeCelebrationProps {
  badgeId: string;
  isVisible: boolean;
  onClose: () => void;
}

export function BadgeCelebration({ badgeId, isVisible, onClose }: BadgeCelebrationProps) {
  const [animationStep, setAnimationStep] = useState(0);
  const badge = Object.values(BADGES).find(b => b.id === badgeId);

  useEffect(() => {
    if (isVisible) {
      // Reset animation
      setAnimationStep(0);
      
      // Sequence of animations for maximum dopamine
      const timeouts = [
        setTimeout(() => setAnimationStep(1), 100),   // Slide in
        setTimeout(() => setAnimationStep(2), 600),   // Scale and glow
        setTimeout(() => setAnimationStep(3), 1200),  // Confetti effect
        setTimeout(() => setAnimationStep(4), 1800),  // Final state
      ];

      return () => timeouts.forEach(clearTimeout);
    }
  }, [isVisible]);

  if (!badge || !isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Confetti Effect */}
        {animationStep >= 3 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r animate-bounce opacity-80`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  backgroundColor: ['#10B981', '#0066CC', '#7C3AED', '#F59E0B', '#EF4444'][i % 5],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            ))}
          </div>
        )}

        {/* Main Badge Card */}
        <Card 
          className={`
            max-w-md w-full mx-auto relative overflow-hidden
            ${animationStep >= 1 ? 'animate-in slide-in-from-bottom-5 duration-500' : 'translate-y-full opacity-0'}
            ${animationStep >= 2 ? 'shadow-2xl shadow-security-blue/20' : ''}
          `}
        >
          <CardContent className="p-8 text-center relative">
            {/* Glowing background effect */}
            {animationStep >= 2 && (
              <div className="absolute inset-0 bg-gradient-to-r from-security-blue/5 to-green-500/5 animate-pulse" />
            )}
            
            {/* Badge Icon with animations */}
            <div className="relative mb-6">
              <div 
                className={`
                  text-8xl transition-all duration-700 transform
                  ${animationStep >= 2 ? 'scale-110 drop-shadow-lg' : 'scale-100'}
                  ${animationStep >= 3 ? 'animate-bounce' : ''}
                `}
                style={{
                  filter: animationStep >= 2 ? 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))' : 'none'
                }}
              >
                {badge.emoji}
              </div>
              
              {/* Glowing ring effect */}
              {animationStep >= 2 && (
                <div className="absolute inset-0 rounded-full animate-ping bg-security-blue/20" 
                     style={{ animationDuration: '2s' }} />
              )}
            </div>

            {/* Success Message */}
            <div className={`
              space-y-4 transition-all duration-500 delay-300
              ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-security-blue to-green-500 bg-clip-text text-transparent">
                  ¡Medalla Desbloqueada! 🎉
                </h2>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {badge.name}
                </h3>
                <p className="text-gray-600 text-lg">
                  {badge.description}
                </p>
              </div>

              {/* Achievement Stats */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+50</div>
                    <div className="text-gray-600">Puntos Bonus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">🏆</div>
                    <div className="text-gray-600">Logro</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className={`
              mt-6 transition-all duration-500 delay-700
              ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              <Button 
                onClick={onClose}
                size="lg"
                className="bg-gradient-to-r from-security-blue to-green-500 hover:from-security-blue/90 hover:to-green-500/90 text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                ¡Increíble! Continuar 🚀
              </Button>
            </div>

            {/* Sparkle effects */}
            {animationStep >= 3 && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-ping"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: '2s'
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sound effect indicator (visual only) */}
      {animationStep >= 2 && (
        <div className="fixed top-4 left-4 z-50 text-xs text-white/60 animate-bounce">
          🔊 ¡Ta-da!
        </div>
      )}
    </>
  );
}