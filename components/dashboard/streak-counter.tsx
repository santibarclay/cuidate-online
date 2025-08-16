'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Flame, Calendar } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  lastActiveDate: string;
}

export function StreakCounter({ streak, lastActiveDate }: StreakCounterProps) {
  const today = new Date().toDateString();
  const isActiveToday = new Date(lastActiveDate).toDateString() === today;
  
  const getStreakColor = (streak: number) => {
    if (streak >= 7) return 'text-orange-500';
    if (streak >= 3) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return '¡Empezá tu racha hoy!';
    if (streak === 1) return '¡Buen comienzo!';
    if (streak < 7) return '¡Seguí así!';
    if (streak < 14) return '¡Increíble!';
    if (streak < 30) return '¡Sos imparable!';
    return '¡Leyenda absoluta!';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className={`${getStreakColor(streak)} flex-shrink-0`}>
            <Flame className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {streak}
              </span>
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                {streak === 1 ? 'día' : 'días'} consecutivos
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {getStreakMessage(streak)}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className={`flex items-center space-x-1 ${isActiveToday ? 'text-security-green' : 'text-gray-400'}`}>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs font-medium">
                {isActiveToday ? 'Activo hoy' : 'Inactivo'}
              </span>
            </div>
          </div>
        </div>
        
        {streak >= 7 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800 font-medium">
              🔥 ¡Racha de fuego! Ganaste el badge &quot;En Llamas&quot;
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}