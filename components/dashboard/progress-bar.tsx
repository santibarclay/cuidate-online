'use client';

import { Progress } from '@/components/ui/progress';
import { calculateXPForNextLevel } from '@/lib/gamification';
import { LEVELS } from '@/lib/constants';

interface ProgressBarProps {
  totalXP: number;
  level: number;
}

export function ProgressBar({ totalXP, level }: ProgressBarProps) {
  const currentLevelXP = level === 1 ? 0 : LEVELS[level as keyof typeof LEVELS].xpRequired;
  const nextLevelXP = level === 3 ? LEVELS[3].xpRequired : LEVELS[(level + 1) as keyof typeof LEVELS].xpRequired;
  const xpForNextLevel = calculateXPForNextLevel(totalXP);
  
  const progressPercentage = level === 3 
    ? 100 
    : ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Nivel {level} - {LEVELS[level as keyof typeof LEVELS].name}
        </span>
        <span className="text-sm text-gray-500">
          {totalXP} XP total
        </span>
      </div>
      
      <Progress 
        value={progressPercentage} 
        max={100}
        color="gradient"
        size="md"
      />
      
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{currentLevelXP} XP</span>
        {level < 3 ? (
          <span className="text-security-blue font-medium">
            {xpForNextLevel} XP para nivel {level + 1}
          </span>
        ) : (
          <span className="text-security-green font-medium">
            ¡Nivel máximo alcanzado! 🎉
          </span>
        )}
        <span>{level === 3 ? totalXP : nextLevelXP} XP</span>
      </div>
    </div>
  );
}