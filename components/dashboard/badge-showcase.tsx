'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BADGES } from '@/lib/constants';

interface BadgeShowcaseProps {
  userBadges: string[];
  className?: string;
}

export function BadgeShowcase({ userBadges, className }: BadgeShowcaseProps) {
  const allBadges = Object.values(BADGES);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Mis Medallas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {allBadges.map((badge) => {
            const isEarned = userBadges.includes(badge.id);
            
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-lg border text-center transition-all ${
                  isEarned 
                    ? 'border-security-green bg-green-50 shadow-sm' 
                    : 'border-gray-200 bg-gray-50 grayscale opacity-60'
                }`}
              >
                <div className="text-2xl mb-2">
                  {badge.emoji}
                </div>
                <h4 className={`font-medium text-sm mb-1 ${
                  isEarned ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {badge.name}
                </h4>
                <p className={`text-xs ${
                  isEarned ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {badge.description}
                </p>
                {isEarned && (
                  <Badge variant="success" className="mt-2 text-xs">
                    Desbloqueado
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
        
        {userBadges.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-medium text-gray-900 mb-2">
              ¡Conseguí tu primera medalla!
            </h3>
            <p className="text-gray-600 text-sm">
              Completá misiones para desbloquear medallas y mostrar tu progreso
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}