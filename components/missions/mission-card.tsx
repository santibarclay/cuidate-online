'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Star, ArrowRight } from 'lucide-react';
import { Mission } from '@/lib/missions-data';

interface MissionCardProps {
  mission: Mission;
  isCompleted: boolean;
  isLocked?: boolean;
  completionRate?: number;
}

export function MissionCard({ mission, isCompleted, isLocked = false, completionRate }: MissionCardProps) {
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Fundamentos';
      case 2: return 'Avanzado';
      case 3: return 'Experto';
      default: return 'Desconocido';
    }
  };

  if (isLocked) {
    return (
      <Card className="opacity-60 cursor-not-allowed">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={getLevelColor(mission.level)}>
                  Nivel {mission.level} - {getLevelName(mission.level)}
                </Badge>
                <Badge variant="locked">
                  🔒 Bloqueado
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {mission.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {mission.description}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4" />
                <span>{mission.xp} XP</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{mission.estimatedTime}</span>
              </div>
            </div>
            <span className="text-xs text-gray-400 text-right sm:text-left">
              Completá las misiones anteriores
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`transition-all hover:shadow-md ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getLevelColor(mission.level)}>
                Nivel {mission.level} - {getLevelName(mission.level)}
              </Badge>
              {isCompleted && (
                <Badge variant="success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completado
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {mission.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {mission.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>{mission.xp} XP</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{mission.estimatedTime}</span>
            </div>
            {completionRate !== undefined && (
              <div className="text-xs text-gray-400">
                {completionRate}% de usuarios completaron
              </div>
            )}
          </div>
          
          <div className="flex justify-end sm:justify-start">
            <Button asChild variant={isCompleted ? "secondary" : "primary"} className="min-w-[100px]">
              <Link href={`/missions/${mission.id}`}>
                {isCompleted ? 'Revisar' : 'Empezar'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}