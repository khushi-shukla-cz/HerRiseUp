import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from './SessionContext';

// Define achievement/badge types
export interface Badge {
  id: string;
  name: string;
  description: string;
  unlockCondition: string;
  unlocked: boolean;
  unlockedAt?: Date;
  image: string; // path to badge image
}

export interface Milestone {
  id: string;
  name: string;
  progress: number; // 0-100%
  target: number;
  current: number;
  completed: boolean;
}

export interface AchievementContextType {
  badges: Badge[];
  milestones: Milestone[];
  weeklyGoals: {
    id: string;
    name: string;
    completed: boolean;
  }[];
  totalSessionsCompleted: number;
  careerActionsCompleted: number;
  unlockBadge: (badgeId: string) => void;
  updateMilestoneProgress: (milestoneId: string, progress: number) => void;
  completeWeeklyGoal: (goalId: string) => void;
  resetWeeklyGoals: () => void;
}

// Predefined badges
const initialBadges: Badge[] = [
  {
    id: 'dream-seeker',
    name: 'Dream Seeker',
    description: 'Welcome, visionary! Your career journey has officially begun.',
    unlockCondition: 'Start your first session',
    unlocked: false,
    image: '/badges/dream-seeker.svg',
  },
  {
    id: 'resume-warrior',
    name: 'Resume Warrior',
    description: 'You\'ve sharpened your first weapon in the job battle: your resume!',
    unlockCondition: 'Complete a full resume review chat',
    unlocked: false,
    image: '/badges/resume-warrior.svg',
  },
  {
    id: 'job-hunter',
    name: 'Job Hunter',
    description: 'Your persistence is your superpower. Keep hunting!',
    unlockCondition: 'Apply to 3 jobs via the app links',
    unlocked: false,
    image: '/badges/job-hunter.svg',
  },
  {
    id: 'interview-challenger',
    name: 'Interview Challenger',
    description: 'Facing your fears head-on! Get ready to conquer any interview room.',
    unlockCondition: 'Complete a mock interview session',
    unlocked: false,
    image: '/badges/interview-challenger.svg',
  },
  {
    id: 'skill-stacker',
    name: 'Skill Stacker',
    description: 'Knowledge is your armor. Keep stacking those skills!',
    unlockCondition: 'Explore 5+ external career learning resources',
    unlocked: false,
    image: '/badges/skill-stacker.svg',
  },
  {
    id: 'community-connector',
    name: 'Community Connector',
    description: 'Strong alone, unstoppable together! You are part of a thriving network.',
    unlockCondition: 'Engage with the JobsForHer community platform',
    unlocked: false,
    image: '/badges/community-connector.svg',
  },
  {
    id: 'career-resilient',
    name: 'Career Resilient',
    description: 'Setbacks are setups for comebacks. You showed true resilience!',
    unlockCondition: 'Bounce back after a rejection conversation',
    unlocked: false,
    image: '/badges/career-resilient.svg',
  },
  {
    id: 'growth-champion',
    name: 'Growth Champion',
    description: 'Consistency wins battles. You\'re building unstoppable momentum.',
    unlockCondition: 'Stay active for 30 days (career tasks at least once per week)',
    unlocked: false,
    image: '/badges/growth-champion.svg',
  }
];

const initialMilestones: Milestone[] = [
  {
    id: 'resume-completion',
    name: 'Resume Completed',
    progress: 0,
    target: 100,
    current: 0,
    completed: false,
  },
  {
    id: 'job-applications',
    name: 'Job Applications',
    progress: 0,
    target: 5,
    current: 0,
    completed: false,
  },
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    progress: 0,
    target: 3,
    current: 0,
    completed: false,
  },
  {
    id: 'skill-development',
    name: 'Skill Development',
    progress: 0,
    target: 5,
    current: 0,
    completed: false,
  }
];

const initialWeeklyGoals = [
  {
    id: 'search-jobs',
    name: 'Search for Job Listings',
    completed: false,
  },
  {
    id: 'update-resume',
    name: 'Update Resume',
    completed: false,
  },
  {
    id: 'interview-practice',
    name: 'Complete Interview Prep',
    completed: false,
  },
  {
    id: 'learn-skill',
    name: 'Learn New Skill Resource',
    completed: false,
  }
];

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { messages } = useSession();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [weeklyGoals, setWeeklyGoals] = useState<{id: string, name: string, completed: boolean}[]>([]);
  const [totalSessionsCompleted, setTotalSessionsCompleted] = useState<number>(0);
  const [careerActionsCompleted, setCareerActionsCompleted] = useState<number>(0);
  
  // Initialize from localStorage or defaults
  useEffect(() => {
    const storedBadges = localStorage.getItem('careerCompanionBadges');
    const storedMilestones = localStorage.getItem('careerCompanionMilestones');
    const storedWeeklyGoals = localStorage.getItem('careerCompanionWeeklyGoals');
    const storedSessions = localStorage.getItem('careerCompanionSessionsCount');
    const storedActions = localStorage.getItem('careerCompanionActionsCount');
    const lastWeeklyReset = localStorage.getItem('careerCompanionLastWeeklyReset');
    
    // Load badges
    if (storedBadges) {
      try {
        setBadges(JSON.parse(storedBadges));
      } catch (error) {
        console.error('Failed to parse stored badges:', error);
        setBadges(initialBadges);
      }
    } else {
      setBadges(initialBadges);
    }
    
    // Load milestones
    if (storedMilestones) {
      try {
        setMilestones(JSON.parse(storedMilestones));
      } catch (error) {
        console.error('Failed to parse stored milestones:', error);
        setMilestones(initialMilestones);
      }
    } else {
      setMilestones(initialMilestones);
    }
    
    // Load weekly goals and check if we need to reset
    const now = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
    
    if (lastWeeklyReset) {
      const lastReset = new Date(lastWeeklyReset);
      if (now.getTime() - lastReset.getTime() > oneWeek) {
        // More than a week has passed, reset weekly goals
        setWeeklyGoals(initialWeeklyGoals);
        localStorage.setItem('careerCompanionLastWeeklyReset', now.toISOString());
        localStorage.setItem('careerCompanionWeeklyGoals', JSON.stringify(initialWeeklyGoals));
      } else if (storedWeeklyGoals) {
        try {
          setWeeklyGoals(JSON.parse(storedWeeklyGoals));
        } catch (error) {
          console.error('Failed to parse stored weekly goals:', error);
          setWeeklyGoals(initialWeeklyGoals);
        }
      } else {
        setWeeklyGoals(initialWeeklyGoals);
      }
    } else {
      // First time, set reset date and use initial goals
      localStorage.setItem('careerCompanionLastWeeklyReset', now.toISOString());
      setWeeklyGoals(initialWeeklyGoals);
    }
    
    // Load session and action counts
    if (storedSessions) {
      setTotalSessionsCompleted(parseInt(storedSessions, 10));
    }
    
    if (storedActions) {
      setCareerActionsCompleted(parseInt(storedActions, 10));
    }
  }, []);

  // When messages change, check if we should unlock the Dream Seeker badge
  useEffect(() => {
    if (messages.length > 0) {
      // This is their first message, so they should get Dream Seeker badge
      unlockBadge('dream-seeker');
      
      // Update total sessions
      const newSessionCount = totalSessionsCompleted + 1;
      setTotalSessionsCompleted(newSessionCount);
      localStorage.setItem('careerCompanionSessionsCount', newSessionCount.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // Save badges to localStorage whenever they change
  useEffect(() => {
    if (badges.length > 0) {
      localStorage.setItem('careerCompanionBadges', JSON.stringify(badges));
    }
  }, [badges]);

  // Save milestones to localStorage whenever they change
  useEffect(() => {
    if (milestones.length > 0) {
      localStorage.setItem('careerCompanionMilestones', JSON.stringify(milestones));
    }
  }, [milestones]);

  // Save weekly goals to localStorage whenever they change
  useEffect(() => {
    if (weeklyGoals.length > 0) {
      localStorage.setItem('careerCompanionWeeklyGoals', JSON.stringify(weeklyGoals));
    }
  }, [weeklyGoals]);

  const unlockBadge = (badgeId: string) => {
    setBadges(prev => 
      prev.map(badge => 
        badge.id === badgeId && !badge.unlocked 
          ? { ...badge, unlocked: true, unlockedAt: new Date() } 
          : badge
      )
    );
    
    // Increment career actions
    const newActionCount = careerActionsCompleted + 1;
    setCareerActionsCompleted(newActionCount);
    localStorage.setItem('careerCompanionActionsCount', newActionCount.toString());
  };

  const updateMilestoneProgress = (milestoneId: string, progress: number) => {
    setMilestones(prev => 
      prev.map(milestone => {
        if (milestone.id === milestoneId) {
          const newCurrent = milestone.current + progress;
          const newProgress = Math.min(100, Math.round((newCurrent / milestone.target) * 100));
          const completed = newCurrent >= milestone.target;
          
          return {
            ...milestone,
            current: newCurrent,
            progress: newProgress,
            completed
          };
        }
        return milestone;
      })
    );
    
    // Increment career actions
    const newActionCount = careerActionsCompleted + 1;
    setCareerActionsCompleted(newActionCount);
    localStorage.setItem('careerCompanionActionsCount', newActionCount.toString());
  };

  const completeWeeklyGoal = (goalId: string) => {
    setWeeklyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: true }
          : goal
      )
    );
    
    // Increment career actions
    const newActionCount = careerActionsCompleted + 1;
    setCareerActionsCompleted(newActionCount);
    localStorage.setItem('careerCompanionActionsCount', newActionCount.toString());
  };

  const resetWeeklyGoals = () => {
    setWeeklyGoals(initialWeeklyGoals);
    localStorage.setItem('careerCompanionLastWeeklyReset', new Date().toISOString());
  };

  return (
    <AchievementContext.Provider
      value={{
        badges,
        milestones,
        weeklyGoals,
        totalSessionsCompleted,
        careerActionsCompleted,
        unlockBadge,
        updateMilestoneProgress,
        completeWeeklyGoal,
        resetWeeklyGoals,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievement = (): AchievementContextType => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievement must be used within an AchievementProvider');
  }
  return context;
}; 