import { LEVELS, BADGES } from './constants';

export interface UserPreferences {
  browser: 'chrome' | 'edge' | 'safari' | 'firefox' | null;
  device: 'android' | 'ios' | null;
  email: 'gmail' | 'outlook' | 'other' | null;
  os: 'windows' | 'mac' | 'linux' | null;
  isPersonalized: boolean;
}

export interface UserProgress {
  name: string;
  avatar: string;
  totalXP: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedMissions: string[];
  badges: string[];
  quizScores: Record<string, { score: number; maxScore: number; attempts: number }>;
  preferences: UserPreferences;
}

export function calculateLevel(totalXP: number): number {
  if (totalXP >= LEVELS[3].xpRequired) return 3;
  if (totalXP >= LEVELS[2].xpRequired) return 2;
  return 1;
}

export function calculateXPForNextLevel(totalXP: number): number {
  const currentLevel = calculateLevel(totalXP);
  if (currentLevel === 3) return 0; // Max level reached
  
  const nextLevelXP = currentLevel === 1 ? LEVELS[2].xpRequired : LEVELS[3].xpRequired;
  return nextLevelXP - totalXP;
}

export function updateStreak(user: UserProgress): UserProgress {
  const today = new Date().toDateString();
  const lastActive = new Date(user.lastActiveDate).toDateString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
  
  let newStreak = user.streak;
  
  if (lastActive === today) {
    // Already active today, keep current streak
    newStreak = user.streak;
  } else if (lastActive === yesterday) {
    // Was active yesterday, increment streak
    newStreak = user.streak + 1;
  } else {
    // Missed a day, reset streak
    newStreak = 1;
  }
  
  return {
    ...user,
    streak: newStreak,
    lastActiveDate: today
  };
}

export function checkBadgeEligibility(user: UserProgress): string[] {
  const newBadges: string[] = [];
  
  // Primera Línea: Complete Level 1
  if (!user.badges.includes(BADGES.PRIMERA_LINEA.id)) {
    const level1Missions = ['cuidemos-contrasenas', 'activar-2fa-email-whatsapp', 'detectar-estafas'];
    const completedLevel1 = level1Missions.every(mission => user.completedMissions.includes(mission));
    if (completedLevel1) {
      newBadges.push(BADGES.PRIMERA_LINEA.id);
    }
  }
  
  // Guardián 2FA: Activate 2FA in 3+ services (simplified for MVP)
  if (!user.badges.includes(BADGES.GUARDIAN_2FA.id)) {
    const twoFAMissions = ['activar-2fa-email-whatsapp']; // Will add more 2FA missions later
    if (user.completedMissions.includes('activar-2fa-email-whatsapp')) {
      newBadges.push(BADGES.GUARDIAN_2FA.id);
    }
  }
  
  // En Llamas: 7 day streak
  if (!user.badges.includes(BADGES.EN_LLAMAS.id) && user.streak >= 7) {
    newBadges.push(BADGES.EN_LLAMAS.id);
  }
  
  // Voy en serio: Complete personalization
  if (!user.badges.includes(BADGES.VOY_EN_SERIO.id) && user.preferences.isPersonalized) {
    newBadges.push(BADGES.VOY_EN_SERIO.id);
  }
  
  return newBadges;
}

export function saveUserProgress(user: UserProgress): void {
  localStorage.setItem('cuidate-online-user', JSON.stringify(user));
}

export function loadUserProgress(): UserProgress | null {
  try {
    const saved = localStorage.getItem('cuidate-online-user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function createNewUser(name: string, avatar: string, preferences?: UserPreferences): UserProgress {
  const defaultPreferences: UserPreferences = {
    browser: null,
    device: null,
    email: null,
    os: null,
    isPersonalized: false
  };
  
  return {
    name,
    avatar,
    totalXP: 50, // Bonus XP for Early Adopter badge
    level: 1,
    streak: 0,
    lastActiveDate: new Date().toDateString(),
    completedMissions: [],
    badges: [BADGES.EARLY_ADOPTER.id], // Give Early Adopter badge to all new users
    quizScores: {},
    preferences: preferences || defaultPreferences
  };
}

export function completeMission(user: UserProgress, missionId: string, xpReward: number): UserProgress {
  if (user.completedMissions.includes(missionId)) {
    return user; // Already completed
  }
  
  const updatedUser: UserProgress = {
    ...user,
    totalXP: user.totalXP + xpReward,
    level: calculateLevel(user.totalXP + xpReward),
    completedMissions: [...user.completedMissions, missionId]
  };
  
  // Check for new badges
  const newBadges = checkBadgeEligibility(updatedUser);
  updatedUser.badges = [...updatedUser.badges, ...newBadges];
  
  return updateStreak(updatedUser);
}

export function updateUserPreferences(user: UserProgress, preferences: UserPreferences): UserProgress {
  const updatedUser = {
    ...user,
    preferences
  };
  
  // Check for new badges when updating preferences
  const newBadges = checkBadgeEligibility(updatedUser);
  if (newBadges.length > 0) {
    updatedUser.badges = [...updatedUser.badges, ...newBadges];
    updatedUser.totalXP += newBadges.length * 50; // 50 XP bonus per badge
    updatedUser.level = calculateLevel(updatedUser.totalXP);
  }
  
  return updatedUser;
}

export function awardBadge(user: UserProgress, badgeId: string): { user: UserProgress; newBadges: string[] } {
  if (user.badges.includes(badgeId)) {
    return { user, newBadges: [] };
  }
  
  const updatedUser = {
    ...user,
    badges: [...user.badges, badgeId],
    totalXP: user.totalXP + 50, // 50 XP bonus per badge
  };
  
  updatedUser.level = calculateLevel(updatedUser.totalXP);
  
  return { user: updatedUser, newBadges: [badgeId] };
}

export function migrateUserProgress(user: any): UserProgress {
  // Migrate old user data to include preferences if they don't exist
  if (!user.preferences) {
    user.preferences = {
      browser: null,
      device: null,
      email: null,
      os: null,
      isPersonalized: false
    };
  }
  
  // Remove deprecated email field from UserProgress (moved to preferences only)
  if ('email' in user) {
    const { email, ...userWithoutEmail } = user;
    return userWithoutEmail as UserProgress;
  }
  
  return user as UserProgress;
}