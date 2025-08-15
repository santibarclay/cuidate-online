'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Quiz } from '@/components/missions/quiz';
import { 
  loadUserProgress, 
  saveUserProgress, 
  completeMission, 
  updateStreak,
  UserProgress,
  migrateUserProgress
} from '@/lib/gamification';
import { PasswordBreachChecker } from '@/components/missions/PasswordBreachChecker';
import { TwoFactorSetup } from '@/components/missions/TwoFactorSetup';
import { ScamDetector } from '@/components/missions/ScamDetector';
import { LinkifiedText } from '@/components/ui/linkified-text';
import { InteractiveIndicator } from '@/components/ui/interactive-indicator';
import { getMissionById } from '@/lib/missions-data';
import { getQuizQuestions } from '@/lib/quiz-questions';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Lightbulb
} from 'lucide-react';

export default function MissionPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id as string;
  
  const [user, setUser] = useState<UserProgress | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [interactiveScore, setInteractiveScore] = useState<number | null>(null);
  
  const mission = getMissionById(missionId);
  const quizQuestions = mission ? getQuizQuestions(mission.id) : [];
  
  useEffect(() => {
    const userProgress = loadUserProgress();
    if (!userProgress) {
      router.push('/register');
      return;
    }
    
    // Migrate old user data to include preferences  
    const migratedUser = migrateUserProgress(userProgress);
    const updatedUser = updateStreak(migratedUser);
    setUser(updatedUser);
    setMissionCompleted(updatedUser.completedMissions.includes(missionId));
    setIsLoading(false);
    
    if (updatedUser.streak !== userProgress.streak) {
      saveUserProgress(updatedUser);
    }
  }, [missionId, router]);
  
  const handleStartQuiz = () => {
    setShowQuiz(true);
  };
  
  const handleQuizComplete = (score: number, maxScore: number) => {
    if (!user || !mission) return;
    
    const percentage = (score / maxScore) * 100;
    const passed = percentage >= 80;
    
    // Save quiz score
    const updatedUser: UserProgress = {
      ...user,
      quizScores: {
        ...user.quizScores,
        [missionId]: {
          score,
          maxScore,
          attempts: (user.quizScores[missionId]?.attempts || 0) + 1
        }
      }
    };
    
    // Complete mission if passed and not already completed
    if (passed && !user.completedMissions.includes(missionId)) {
      const completedUser = completeMission(updatedUser, missionId, mission.xp);
      setUser(completedUser);
      saveUserProgress(completedUser);
      setMissionCompleted(true);
      
      // Show success message or navigate
      setTimeout(() => {
        const hasNewBadges = completedUser.badges.length > user.badges.length;
        if (hasNewBadges) {
          // Could show a badge notification here
        }
      }, 2000);
    } else {
      setUser(updatedUser);
      saveUserProgress(updatedUser);
    }
  };

  const handleInteractiveComplete = (score?: number) => {
    if (score !== undefined) {
      setInteractiveScore(score);
    }
    setShowQuiz(true);
  };

  const handleStartInteractive = () => {
    setShowInteractive(true);
  };

  const scrollToInteractive = () => {
    const element = document.getElementById('interactive-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!mission || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Misión no encontrada
            </h1>
            <p className="text-gray-600 mb-6">
              La misión que buscás no existe o no está disponible.
            </p>
            <Button asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const userQuizScore = user.quizScores[missionId];
  const hasPassedQuiz = userQuizScore && (userQuizScore.score / userQuizScore.maxScore) * 100 >= 80;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
        <Button variant="secondary" asChild className="w-fit">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Link>
        </Button>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge className={getLevelColor(mission.level)}>
              Nivel {mission.level}
            </Badge>
            {missionCompleted && (
              <Badge variant="success">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completada
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {mission.title}
          </h1>
        </div>
      </div>

      {/* Mission Info */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-3 sm:p-6 text-center">
            <Star className="h-4 w-4 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-1 sm:mb-2" />
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{mission.xp}</p>
            <p className="text-xs sm:text-sm text-gray-600">XP</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-6 text-center">
            <Clock className="h-4 w-4 sm:h-8 sm:w-8 text-security-blue mx-auto mb-1 sm:mb-2" />
            <p className="text-sm sm:text-2xl font-bold text-gray-900">{mission.estimatedTime}</p>
            <p className="text-xs sm:text-sm text-gray-600">estimado</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 sm:p-6 text-center">
            <div className="text-lg sm:text-2xl mb-1 sm:mb-2">{missionCompleted ? '✅' : '⏳'}</div>
            <p className="text-sm sm:text-2xl font-bold text-gray-900">
              {missionCompleted ? 'Completa' : 'Pendiente'}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">Estado</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alert */}
      <Card className="mb-8 border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">
                ¿Por qué es importante esta misión?
              </h3>
              <p className="text-orange-700">
                {mission.risk}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Content */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Guía paso a paso</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            {mission.description}
          </p>
          
          <ol className="space-y-4">
            {mission.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-3 sm:space-x-4">
                <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-security-blue text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold">
                  {index + 1}
                </span>
                <div className="text-gray-700 pt-1 flex-1 min-w-0 break-words">
                  <LinkifiedText text={step} />
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>


      {/* Tips from Santiago */}
      {mission.tips.length > 0 && (
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-security-blue">
              <Lightbulb className="h-5 w-5" />
              <span>Tips de Santiago</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mission.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-security-blue text-lg">💡</span>
                  <p className="text-blue-800">{tip}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Resources */}
      {mission.resources.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recursos útiles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mission.resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-security-blue hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>{resource.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Interactive Mission Content */}
      {!missionCompleted && (
        <Card className="mb-8" id="interactive-section">
          <CardHeader>
            <CardTitle>
              {missionId === 'cuidemos-contrasenas' && 'Verificá tus contraseñas'}
              {missionId === 'activar-2fa-email-whatsapp' && 'Activá el 2FA'}
              {missionId === 'detectar-estafas' && 'Practicá detectando estafas'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showInteractive && !showQuiz ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-6">
                  {missionId === 'cuidemos-contrasenas' && 'Ahora vamos a verificar si alguna de tus contraseñas fue comprometida'}
                  {missionId === 'activar-2fa-email-whatsapp' && 'Seguí las guías personalizadas para activar 2FA en tus cuentas'}
                  {missionId === 'detectar-estafas' && 'Practicá identificando estafas reales de internet'}
                </p>
                <Button onClick={handleStartInteractive} size="lg">
                  {missionId === 'cuidemos-contrasenas' && 'Verificar contraseñas'}
                  {missionId === 'activar-2fa-email-whatsapp' && 'Empezar configuración'}
                  {missionId === 'detectar-estafas' && 'Comenzar práctica'}
                </Button>
              </div>
            ) : showInteractive ? (
              <div>
                {missionId === 'cuidemos-contrasenas' && (
                  <PasswordBreachChecker
                    userPreferences={user.preferences || { browser: null, device: null, email: null, os: null, isPersonalized: false }}
                    onComplete={handleInteractiveComplete}
                  />
                )}
                {missionId === 'activar-2fa-email-whatsapp' && (
                  <TwoFactorSetup
                    userPreferences={user.preferences || { browser: null, device: null, email: null, os: null, isPersonalized: false }}
                    onComplete={handleInteractiveComplete}
                  />
                )}
                {missionId === 'detectar-estafas' && (
                  <ScamDetector
                    onComplete={handleInteractiveComplete}
                  />
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Quiz Section */}
      {quizQuestions.length > 0 && (showQuiz || missionCompleted) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Verificá tu conocimiento</CardTitle>
          </CardHeader>
          <CardContent>
            {showQuiz && !missionCompleted ? (
              <div>
                {interactiveScore !== null && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">
                      Resultado de la práctica: {interactiveScore}%
                    </h4>
                    <p className="text-blue-700 text-sm">
                      ¡Bien hecho! Ahora respondé el quiz final para completar la misión.
                    </p>
                  </div>
                )}
                <Quiz 
                  questions={quizQuestions}
                  onComplete={handleQuizComplete}
                  missionTitle={mission.title}
                />
              </div>
            ) : missionCompleted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="h-12 w-12 text-security-green mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ¡Misión Completada!
                </h3>
                <p className="text-gray-600 mb-4">
                  Has demostrado que dominás estos conceptos de seguridad digital.
                </p>
                <div className="bg-security-green/10 border border-security-green/20 rounded-lg p-4">
                  <p className="text-security-green font-medium">
                    +{mission.xp} XP ganados • Misión completada
                  </p>
                </div>
              </div>
            ) : null}
            
            {userQuizScore && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Mejor puntuación: {userQuizScore.score}/{userQuizScore.maxScore} 
                  ({Math.round((userQuizScore.score / userQuizScore.maxScore) * 100)}%)
                  {userQuizScore.attempts > 1 && ` • ${userQuizScore.attempts} intentos`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Next Mission */}
      {missionCompleted && (
        <Card className="bg-security-blue text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold mb-4">
              ¡Excelente trabajo! 🎉
            </h3>
            <p className="mb-6 opacity-90">
              Has completado esta misión y ganado {mission.xp} XP. ¡Seguí protegiendo tu vida digital!
            </p>
            <Button asChild variant="secondary">
              <Link href="/dashboard">
                Ver próxima misión
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}