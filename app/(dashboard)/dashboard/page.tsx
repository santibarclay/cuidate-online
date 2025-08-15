'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/dashboard/progress-bar';
import { StreakCounter } from '@/components/dashboard/streak-counter';
import { BadgeShowcase } from '@/components/dashboard/badge-showcase';
import { MissionCard } from '@/components/missions/mission-card';
import { loadUserProgress, saveUserProgress, updateStreak, UserProgress } from '@/lib/gamification';
import { MISSIONS, getMissionsByLevel } from '@/lib/missions-data';
import { SITE_NAME } from '@/lib/constants';
import { TrendingUp, Target, Award } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const userProgress = loadUserProgress();
      if (userProgress) {
        // Update streak on dashboard load
        const updatedUser = updateStreak(userProgress);
        if (updatedUser.streak !== userProgress.streak || updatedUser.lastActiveDate !== userProgress.lastActiveDate) {
          saveUserProgress(updatedUser);
        }
        setUser(updatedUser);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const level1Missions = getMissionsByLevel(1);
  const availableMissions = level1Missions.slice(0, 3); // Show only first 3 missions for MVP
  
  const nextMission = availableMissions.find(mission => !user.completedMissions.includes(mission.id));
  
  const completionStats = {
    totalMissions: availableMissions.length,
    completedMissions: user.completedMissions.length,
    completionRate: Math.round((user.completedMissions.length / availableMissions.length) * 100) || 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Hola {user.name}, seguí cuidándote {user.avatar}
        </h1>
        <p className="text-gray-600">
          Bienvenido a tu dashboard de {SITE_NAME}. Aquí podés ver tu progreso y continuar con tus misiones.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* XP and Level */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-security-blue/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-security-blue" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">XP Total</p>
                <p className="text-2xl font-bold text-gray-900">{user.totalXP}</p>
                <p className="text-sm text-security-blue">Nivel {user.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-security-green/10 rounded-lg">
                <Target className="h-6 w-6 text-security-green" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Misiones</p>
                <p className="text-2xl font-bold text-gray-900">
                  {completionStats.completedMissions}/{completionStats.totalMissions}
                </p>
                <p className="text-sm text-security-green">
                  {completionStats.completionRate}% completado
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Badges</p>
                <p className="text-2xl font-bold text-gray-900">{user.badges.length}</p>
                <p className="text-sm text-yellow-600">desbloqueados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tu Progreso</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar totalXP={user.totalXP} level={user.level} />
        </CardContent>
      </Card>

      {/* Streak Counter */}
      <div className="mb-8">
        <StreakCounter streak={user.streak} lastActiveDate={user.lastActiveDate} />
      </div>

      {/* Next Mission */}
      {nextMission && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Próxima Misión</CardTitle>
          </CardHeader>
          <CardContent>
            <MissionCard
              mission={nextMission}
              isCompleted={false}
            />
          </CardContent>
        </Card>
      )}

      {/* All Missions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Misiones Disponibles - Nivel 1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableMissions.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                isCompleted={user.completedMissions.includes(mission.id)}
                completionRate={Math.floor(Math.random() * 30) + 60} // Mock completion rate
              />
            ))}
          </div>
          
          {/* Coming Soon */}
          <div className="mt-6 p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Más misiones próximamente
            </h3>
            <p className="text-gray-600">
              Estamos preparando más misiones de Nivel 2 y Nivel 3. ¡Seguí completando las actuales!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Badges Showcase */}
      <BadgeShowcase userBadges={user.badges} />
    </div>
  );
}