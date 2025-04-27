import { toast } from "@/components/ui/use-toast";
import confetti from 'canvas-confetti';

/**
 * Show a celebratory notification when a user unlocks a badge
 */
export const showBadgeUnlockedNotification = (badgeName: string, badgeDescription: string) => {
  // Trigger confetti
  triggerConfetti();
  
  // Show a toast notification
  toast({
    title: `🎉 Achievement Unlocked: ${badgeName}`,
    description: badgeDescription,
    duration: 5000,
  });
};

/**
 * Show a progress notification when a user makes progress on a milestone
 */
export const showMilestoneProgressNotification = (milestoneName: string, progress: number, total: number) => {
  toast({
    title: `📈 Progress Update: ${milestoneName}`,
    description: `${progress}/${total} completed. Keep going!`,
    duration: 3000,
  });
};

/**
 * Show a weekly goal completion notification
 */
export const showWeeklyGoalCompletedNotification = (goalName: string) => {
  toast({
    title: `✅ Weekly Goal Completed`,
    description: `You've completed: ${goalName}`,
    duration: 3000,
  });
};

/**
 * Trigger confetti animation for celebrations
 */
export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

/**
 * Analyzes user message for achievement triggers
 * Returns an object with detected achievement types
 */
export const analyzeMessageForAchievements = (message: string) => {
  const achievements = {
    resume: false,
    resumeCompleted: false,
    interview: false,
    job: false,
    skill: false,
    community: false,
  };
  
  // Resume related
  if (/resume|CV|curriculum vitae/i.test(message)) {
    achievements.resume = true;
    
    // Check if resume is completed
    if (/finished|complete|updated|done|ready/i.test(message)) {
      achievements.resumeCompleted = true;
    }
  }
  
  // Interview related
  if (/interview|prepare|practice question/i.test(message)) {
    achievements.interview = true;
  }
  
  // Job search related
  if (/job|position|opening|apply|application/i.test(message)) {
    achievements.job = true;
  }
  
  // Skill development related
  if (/learn|course|skill|training|workshop/i.test(message)) {
    achievements.skill = true;
  }
  
  // Community related
  if (/community|network|connect|group|forum/i.test(message)) {
    achievements.community = true;
  }
  
  return achievements;
};

/**
 * Suggests next achievements based on current unlocked badges
 */
export const suggestNextAchievements = (unlockedBadgeIds: string[]) => {
  const suggestions = [];
  
  if (!unlockedBadgeIds.includes('resume-warrior')) {
    suggestions.push("Complete your resume to earn the Resume Warrior badge");
  }
  
  if (!unlockedBadgeIds.includes('job-hunter')) {
    suggestions.push("Search and apply for jobs to earn the Job Hunter badge");
  }
  
  if (!unlockedBadgeIds.includes('interview-challenger')) {
    suggestions.push("Practice interview questions to earn the Interview Challenger badge");
  }
  
  if (!unlockedBadgeIds.includes('skill-stacker')) {
    suggestions.push("Explore learning resources to earn the Skill Stacker badge");
  }
  
  return suggestions;
};

/**
 * Checks if a weekly goal reset is needed (called on app initialization)
 */
export const checkWeeklyGoalReset = () => {
  const lastWeeklyReset = localStorage.getItem('careerCompanionLastWeeklyReset');
  const now = new Date();
  const oneWeek = 7 * 24 * 60 * 60 * 1000; // one week in milliseconds
  
  if (lastWeeklyReset) {
    const lastReset = new Date(lastWeeklyReset);
    if (now.getTime() - lastReset.getTime() > oneWeek) {
      return true;
    }
  } else {
    // First time checking, so set the reset date
    localStorage.setItem('careerCompanionLastWeeklyReset', now.toISOString());
  }
  
  return false;
}; 