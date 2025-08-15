'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { loadUserProgress, UserProgress } from '@/lib/gamification';
import { Crown, Trophy, Medal, Star, Users, TrendingUp } from 'lucide-react';

interface LeaderboardEntry {
  name: string;
  avatar: string;
  totalXP: number;
  level: number;
  badges: string[];
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const [currentUser, setCurrentUser] = useState<UserProgress | null>(null);
  const [topUsers, setTopUsers] = useState<LeaderboardEntry[]>([]);
  const [weeklyUsers, setWeeklyUsers] = useState<LeaderboardEntry[]>([]);
  const [userPosition, setUserPosition] = useState<number>(0);
  
  useEffect(() => {
    const user = loadUserProgress();
    if (user) {
      setCurrentUser(user);
      
      // Generate mock leaderboard data for MVP
      // In a real app, this would come from an API
      const mockTopUsers: LeaderboardEntry[] = [
        { name: "María González", avatar: "👩‍💻", totalXP: 2450, level: 3, badges: ["primera_linea", "guardian_2fa", "en_llamas"] },
        { name: "Carlos Rodriguez", avatar: "👨‍💼", totalXP: 2100, level: 3, badges: ["primera_linea", "guardian_2fa"] },
        { name: "Ana Martinez", avatar: "👩‍🎓", totalXP: 1890, level: 3, badges: ["primera_linea", "guardian_2fa", "cazador_phishing"] },
        { name: "Diego Lopez", avatar: "🧑‍💻", totalXP: 1650, level: 2, badges: ["primera_linea", "guardian_2fa"] },
        { name: "Laura Fernandez", avatar: "👩‍💼", totalXP: 1520, level: 2, badges: ["primera_linea", "en_llamas"] },
        { name: "Roberto Silva", avatar: "👨‍🎓", totalXP: 1340, level: 2, badges: ["primera_linea"] },
        { name: "Camila Torres", avatar: "👩‍💻", totalXP: 1200, level: 2, badges: ["primera_linea", "guardian_2fa"] },
        { name: "Mateo Ruiz", avatar: "🧑‍💼", totalXP: 1150, level: 2, badges: ["primera_linea"] },
        { name: user.name, avatar: user.avatar, totalXP: user.totalXP, level: user.level, badges: user.badges, isCurrentUser: true },
        { name: "Sofia Morales", avatar: "👩‍🎓", totalXP: 980, level: 1, badges: [] }
      ];
      
      // Sort by XP and find user position
      const sortedUsers = mockTopUsers.sort((a, b) => b.totalXP - a.totalXP);
      const position = sortedUsers.findIndex(u => u.isCurrentUser) + 1;
      
      setTopUsers(sortedUsers.slice(0, 10));
      setUserPosition(position);
      
      // Mock weekly leaderboard
      const mockWeeklyUsers = [
        { name: "Ana Martinez", avatar: "👩‍🎓", totalXP: 450, level: 3, badges: [] },
        { name: "Diego Lopez", avatar: "🧑‍💻", totalXP: 380, level: 2, badges: [] },
        { name: user.name, avatar: user.avatar, totalXP: Math.min(user.totalXP, 350), level: user.level, badges: [], isCurrentUser: true },
        { name: "Laura Fernandez", avatar: "👩‍💼", totalXP: 290, level: 2, badges: [] },
        { name: "Carlos Rodriguez", avatar: "👨‍💼", totalXP: 270, level: 3, badges: [] }
      ];
      
      setWeeklyUsers(mockWeeklyUsers.sort((a, b) => b.totalXP - a.totalXP).slice(0, 10));
    }
  }, []);
  
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-yellow-600" />;
      default: return <span className="text-sm font-medium text-gray-500">#{position}</span>;
    }
  };
  
  const getRankBg = (position: number, isCurrentUser?: boolean) => {
    if (isCurrentUser) return 'bg-security-blue/10 border-security-blue';
    switch (position) {
      case 1: return 'bg-yellow-50 border-yellow-200';
      case 2: return 'bg-gray-50 border-gray-200';
      case 3: return 'bg-yellow-50/50 border-yellow-100';
      default: return 'bg-white border-gray-200';
    }
  };

  if (!currentUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-600">Cargando ranking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Ranking - Cuidate Online
        </h1>
        <p className="text-gray-600">
          Descubrí cómo te comparás con otros usuarios en tu camino hacia la seguridad digital
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-security-blue mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{currentUser.totalXP}</p>
            <p className="text-sm text-gray-600">Tu XP total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-security-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">#{userPosition}</p>
            <p className="text-sm text-gray-600">Tu posición</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{currentUser.badges.length}</p>
            <p className="text-sm text-gray-600">Badges obtenidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboards */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* All Time Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Top 10 - Histórico</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topUsers.map((user, index) => (
                <div 
                  key={`${user.name}-${index}`}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${getRankBg(index + 1, user.isCurrentUser)}`}
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="text-2xl">{user.avatar}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${user.isCurrentUser ? 'text-security-blue' : 'text-gray-900'}`}>
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <Badge variant="primary" className="text-xs">
                          Vos
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>Nivel {user.level}</span>
                      <span>•</span>
                      <span>{user.badges.length} badges</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{user.totalXP.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-security-green" />
              <span>Top 10 - Esta semana</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyUsers.map((user, index) => (
                <div 
                  key={`weekly-${user.name}-${index}`}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${getRankBg(index + 1, user.isCurrentUser)}`}
                >
                  <div className="flex-shrink-0 w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="text-2xl">{user.avatar}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${user.isCurrentUser ? 'text-security-blue' : 'text-gray-900'}`}>
                        {user.name}
                      </span>
                      {user.isCurrentUser && (
                        <Badge variant="primary" className="text-xs">
                          Vos
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Nivel {user.level}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{user.totalXP}</p>
                    <p className="text-xs text-gray-600">XP esta semana</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card className="mt-8 bg-gradient-to-r from-security-blue to-blue-600 text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-4">🚀 Próximamente: Ligas y Competencias</h3>
          <p className="opacity-90 mb-6">
            Estamos preparando un sistema de ligas (Bronce, Plata, Oro) y competencias mensuales. 
            ¡Seguí completando misiones para estar listo!
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-white/20 text-white border-white/30">
              Liga Bronce: 0-999 XP
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              Liga Plata: 1000-1999 XP
            </Badge>
            <Badge className="bg-white/20 text-white border-white/30">
              Liga Oro: 2000+ XP
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}