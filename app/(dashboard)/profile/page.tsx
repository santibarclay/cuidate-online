'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/dashboard/progress-bar';
import { BadgeShowcase } from '@/components/dashboard/badge-showcase';
import { loadUserProgress, saveUserProgress, UserProgress, updateUserPreferences, migrateUserProgress } from '@/lib/gamification';
import { MISSIONS } from '@/lib/missions-data';
import { BADGES } from '@/lib/constants';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Target,
  Download,
  Trash2,
  Edit,
  Settings,
  Chrome,
  Smartphone,
  Monitor
} from 'lucide-react';
import { PersonalizationFlow } from '@/components/personalization/PersonalizationFlow';

export default function ProfilePage() {
  const [user, setUser] = useState<UserProgress | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [showPersonalization, setShowPersonalization] = useState(false);

  useEffect(() => {
    const userProgress = loadUserProgress();
    if (userProgress) {
      // Migrate old user data to include preferences
      const migratedUser = migrateUserProgress(userProgress);
      setUser(migratedUser);
      setEditName(migratedUser.name);
      
      // Save migrated data if it was updated
      if (migratedUser !== userProgress) {
        saveUserProgress(migratedUser);
      }
    }
  }, []);

  const handleSaveName = () => {
    if (!user || !editName.trim()) return;
    
    const updatedUser = { ...user, name: editName.trim() };
    setUser(updatedUser);
    saveUserProgress(updatedUser);
    setIsEditing(false);
  };

  const handleExportData = () => {
    if (!user) return;
    
    const dataToExport = {
      profile: {
        name: user.name,
        avatar: user.avatar,
        level: user.level,
        totalXP: user.totalXP,
        streak: user.streak,
        joinDate: user.lastActiveDate,
      },
      progress: {
        completedMissions: user.completedMissions,
        badges: user.badges.map(badgeId => ({
          id: badgeId,
          name: BADGES[badgeId as keyof typeof BADGES]?.name || 'Desconocido',
          emoji: BADGES[badgeId as keyof typeof BADGES]?.emoji || '🏆'
        })),
        quizScores: user.quizScores
      },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cuidate-online-progreso-${user.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteProgress = () => {
    if (confirm('¿Estás seguro? Esta acción eliminará todo tu progreso y no se puede deshacer.')) {
      localStorage.removeItem('cuidate-online-user');
      window.location.href = '/';
    }
  };

  const handlePersonalizationUpdate = (preferences: any) => {
    if (!user) return;
    
    const updatedUser = updateUserPreferences(user, preferences);
    setUser(updatedUser);
    saveUserProgress(updatedUser);
    setShowPersonalization(false);
  };

  const getPersonalizationStatus = () => {
    if (!user?.preferences) return 'No configurada';
    if (!user.preferences.isPersonalized) return 'Genérica';
    return 'Personalizada';
  };

  const getPersonalizationColor = () => {
    if (!user?.preferences) return 'text-gray-500';
    if (!user.preferences.isPersonalized) return 'text-orange-600';
    return 'text-security-green';
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const completedMissions = MISSIONS.filter(mission => 
    user.completedMissions.includes(mission.id)
  );

  const joinDate = new Date(user.lastActiveDate).toLocaleDateString('es-AR');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
        <p className="text-gray-600">
          Administrá tu información y revisá tu progreso en Cuidate Online
        </p>
      </div>

      {/* Profile Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Información del Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6 mb-6">
            <div className="text-6xl">{user.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-2xl font-bold text-gray-900 border rounded px-2 py-1"
                      maxLength={50}
                    />
                    <Button size="sm" onClick={handleSaveName}>
                      Guardar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditName(user.name);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Nivel {user.level}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Desde {joinDate}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-security-blue">{user.totalXP}</div>
              <div className="text-sm text-gray-600">XP Total</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-security-green">{user.completedMissions.length}</div>
              <div className="text-sm text-gray-600">Misiones</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{user.badges.length}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{user.streak}</div>
              <div className="text-sm text-gray-600">Racha</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Progreso General</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressBar totalXP={user.totalXP} level={user.level} />
        </CardContent>
      </Card>

      {/* Completed Missions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Misiones Completadas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedMissions.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aún no completaste ninguna misión</p>
              <p className="text-sm text-gray-500 mt-1">¡Empezá tu primera misión desde el dashboard!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedMissions.map((mission) => {
                const quizScore = user.quizScores[mission.id];
                const scorePercentage = quizScore 
                  ? Math.round((quizScore.score / quizScore.maxScore) * 100)
                  : 0;

                return (
                  <div key={mission.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{mission.title}</h4>
                      <p className="text-sm text-gray-600">Nivel {mission.level} • {mission.xp} XP</p>
                    </div>
                    {quizScore && (
                      <div className="text-right">
                        <Badge variant="success">
                          Quiz: {scorePercentage}%
                        </Badge>
                        {quizScore.attempts > 1 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {quizScore.attempts} intentos
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Badges */}
      <div className="mb-8">
        <BadgeShowcase userBadges={user.badges} />
      </div>

      {/* Personalization Settings */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Personalización</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Estado de personalización</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm font-medium ${getPersonalizationColor()}`}>
                    {getPersonalizationStatus()}
                  </span>
                  {user.preferences?.isPersonalized && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      {user.preferences.browser && <Chrome className="h-3 w-3" />}
                      {user.preferences.device && <Smartphone className="h-3 w-3" />}
                      {user.preferences.os && <Monitor className="h-3 w-3" />}
                    </div>
                  )}
                </div>
              </div>
              <Button 
                onClick={() => setShowPersonalization(true)}
                variant="outline"
              >
                {user.preferences?.isPersonalized ? 'Modificar' : 'Configurar'}
              </Button>
            </div>
            
            {user.preferences?.isPersonalized && (
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Navegador</div>
                  <div className="text-xs text-gray-600 capitalize">
                    {user.preferences.browser || 'No especificado'}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Dispositivo</div>
                  <div className="text-xs text-gray-600 capitalize">
                    {user.preferences.device || 'No especificado'}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Email</div>
                  <div className="text-xs text-gray-600 capitalize">
                    {user.preferences.email || 'No especificado'}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-medium text-gray-700">Sistema</div>
                  <div className="text-xs text-gray-600 capitalize">
                    {user.preferences.os || 'No especificado'}
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">¿Qué significa esto?</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• <strong>Personalizada:</strong> Recibes guías específicas para tus herramientas</li>
                <li>• <strong>Genérica:</strong> Recibes guías generales que funcionan para cualquiera</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Gestión de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Exportar mi progreso</h4>
                <p className="text-sm text-gray-600">Descargá un archivo JSON con toda tu información y progreso</p>
              </div>
              <Button onClick={handleExportData} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Eliminar mi progreso</h4>
                <p className="text-sm text-gray-600">Borrá permanentemente toda tu información de este dispositivo</p>
              </div>
              <Button onClick={handleDeleteProgress} variant="outline" className="text-red-600 border-red-300 hover:bg-red-100">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar
              </Button>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Sobre tu privacidad</h4>
            <p className="text-sm text-gray-600">
              🔒 Todos tus datos se guardan únicamente en este dispositivo. No enviamos ni almacenamos 
              información personal en servidores externos. Podés eliminar toda tu información en cualquier momento.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Personalization Flow Modal */}
      {showPersonalization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-4xl w-full">
            <PersonalizationFlow
              onComplete={handlePersonalizationUpdate}
              onSkip={() => setShowPersonalization(false)}
              initialPreferences={user.preferences}
            />
          </div>
        </div>
      )}
    </div>
  );
}