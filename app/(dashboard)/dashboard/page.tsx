'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/dashboard/progress-bar';
import { StreakCounter } from '@/components/dashboard/streak-counter';
import { BadgeShowcase } from '@/components/dashboard/badge-showcase';
import { MissionCard } from '@/components/missions/mission-card';
import { loadUserProgress, saveUserProgress, updateStreak, UserProgress, migrateUserProgress, updateUserPreferences, UserPreferences } from '@/lib/gamification';
import { MISSIONS, getMissionsByLevel } from '@/lib/missions-data';
import { SITE_NAME, BADGES } from '@/lib/constants';
import { TrendingUp, Target, Award, Settings, User } from 'lucide-react';
import { PersonalizationFlow } from '@/components/personalization/PersonalizationFlow';
import { BadgeCelebration } from '@/components/ui/badge-celebration';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [showBadgeCelebration, setShowBadgeCelebration] = useState('');

  useEffect(() => {
    const loadUser = () => {
      const userProgress = loadUserProgress();
      if (userProgress) {
        // Migrate old user data to include preferences
        const migratedUser = migrateUserProgress(userProgress);
        
        // Update streak on dashboard load
        const updatedUser = updateStreak(migratedUser);
        if (updatedUser.streak !== userProgress.streak || 
            updatedUser.lastActiveDate !== userProgress.lastActiveDate ||
            migratedUser !== userProgress) {
          saveUserProgress(updatedUser);
        }
        setUser(updatedUser);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const handlePersonalizationComplete = (preferences: UserPreferences) => {
    if (!user) return;
    
    const updatedUser = updateUserPreferences(user, preferences);
    setUser(updatedUser);
    saveUserProgress(updatedUser);
    setShowPersonalization(false);
    
    // Check if "Voy en serio" badge was newly awarded
    if (updatedUser.badges.includes(BADGES.VOY_EN_SERIO.id) && !user.badges.includes(BADGES.VOY_EN_SERIO.id)) {
      setShowBadgeCelebration(BADGES.VOY_EN_SERIO.id);
    }
  };

  const handlePersonalizationSkip = () => {
    setShowPersonalization(false);
  };

  const handleBadgeCelebrationClose = () => {
    setShowBadgeCelebration('');
  };

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
  const level2Missions = getMissionsByLevel(2);
  const availableMissions = level1Missions; // Show all Level 1 missions
  
  // Find next mission from Level 1, then Level 2 if Level 1 is complete
  const level1Completed = level1Missions.every(mission => user.completedMissions.includes(mission.id));
  const nextMission = level1Missions.find(mission => !user.completedMissions.includes(mission.id)) ||
    (level1Completed ? level2Missions.find(mission => !user.completedMissions.includes(mission.id)) : null);
  
  const allMissions = [...level1Missions, ...level2Missions];
  const completionStats = {
    totalMissions: allMissions.length,
    completedMissions: user.completedMissions.length,
    completionRate: Math.round((user.completedMissions.length / allMissions.length) * 100) || 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Hola {user.name}, seguí cuidándote {user.avatar}
            </h1>
            <p className="text-gray-600 mb-3 sm:mb-0">
              Bienvenido a tu dashboard de {SITE_NAME}. Aquí podés ver tu progreso y continuar con tus misiones.
            </p>
          </div>
          
          {/* Personalization Status */}
          <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
            <div className="sm:text-right">
              <div className="text-sm text-gray-500">Experiencia</div>
              <div className={`text-sm font-medium whitespace-nowrap ${
                user.preferences?.isPersonalized 
                  ? 'text-security-green' 
                  : 'text-orange-600'
              }`}>
                {user.preferences?.isPersonalized ? '✨ Personalizada' : '📋 Genérica'}
              </div>
            </div>
            <button 
              onClick={() => setShowPersonalization(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {user.preferences?.isPersonalized ? (
                <User className="h-6 w-6 text-security-blue" />
              ) : (
                <Settings className="h-6 w-6 text-orange-600" />
              )}
            </button>
          </div>
        </div>

        {/* Acción Principal - Primera Misión */}
        {nextMission && (
          <div className="mt-4">
            <Link href={`/missions/${nextMission.id}`}>
              <button className="w-full p-4 sm:p-6 bg-gradient-to-r from-security-green to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all cursor-pointer shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="text-left">
                    <h4 className="font-bold text-base sm:text-lg mb-1">
                      {user.completedMissions.length === 0 ? '🚀 Primera Misión' : '🎯 Siguiente Misión'}
                    </h4>
                    <p className="text-green-100 text-sm sm:text-base">
                      {nextMission.title}
                    </p>
                  </div>
                  <div className="text-right sm:ml-4">
                    <div className="text-xs sm:text-sm text-green-100">
                      {nextMission.estimatedTime} • {nextMission.xp} XP
                    </div>
                  </div>
                </div>
              </button>
            </Link>
          </div>
        )}
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
                <p className="text-sm text-gray-600">Puntos Totales</p>
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
                <p className="text-sm text-gray-600">Medallas</p>
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

      {/* Level 1 Missions */}
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
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Level 2 Missions */}
      {level2Missions.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Misiones Disponibles - Nivel 2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {level2Missions.map((mission) => {
                // Check if user has completed all Level 1 missions to unlock Level 2
                const level1Completed = level1Missions.every(l1Mission => user.completedMissions.includes(l1Mission.id));
                const isLocked = !level1Completed;

                return (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    isCompleted={user.completedMissions.includes(mission.id)}
                    isLocked={isLocked}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coming Soon */}
      <div className="mt-6 p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Más misiones próximamente
        </h3>
        <p className="text-gray-600">
          Estamos preparando más misiones de Nivel 3. ¡Seguí completando las actuales!
        </p>
      </div>

      {/* Badges Showcase */}
      <BadgeShowcase userBadges={user.badges} />
      
      {/* Personalization Modal */}
      {showPersonalization && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <PersonalizationFlow
            onComplete={handlePersonalizationComplete}
            onSkip={handlePersonalizationSkip}
            initialPreferences={user.preferences}
          />
        </div>
      )}

      {/* Badge Celebration */}
      <BadgeCelebration
        badgeId={showBadgeCelebration}
        isVisible={!!showBadgeCelebration}
        onClose={handleBadgeCelebrationClose}
      />
    </div>
  );
}