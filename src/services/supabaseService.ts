import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * User authentication and profile management
 */

// Sign up a new user
export const signUpUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in an existing user
export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out the current user
export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get the current user session
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

// Get the current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

/**
 * User profile management
 */

// Create or update a user profile
export const upsertUserProfile = async (userId: string, profile: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Get a user profile by ID
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

/**
 * Chat history management
 */

// Save a chat message
export const saveChatMessage = async (userId: string, message: any) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: message.content,
        role: message.role,
        timestamp: message.timestamp || new Date(),
      })
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving chat message:', error);
    throw error;
  }
};

// Get chat history for a user
export const getChatHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

/**
 * Career interests management
 */

// Save user career interests
export const saveCareerInterests = async (userId: string, interests: string[]) => {
  try {
    const { data, error } = await supabase
      .from('user_interests')
      .upsert({
        user_id: userId,
        interests,
        updated_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving career interests:', error);
    throw error;
  }
};

// Get user career interests
export const getCareerInterests = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_interests')
      .select('interests')
      .eq('user_id', userId)
      .single();
    
    if (error) throw error;
    return data?.interests || [];
  } catch (error) {
    console.error('Error fetching career interests:', error);
    return [];
  }
};

/**
 * Achievements and badges management
 */

// Save user achievement
export const saveAchievement = async (userId: string, achievement: any) => {
  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        badge_id: achievement.id,
        unlocked_at: new Date(),
      })
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving achievement:', error);
    throw error;
  }
};

// Get user achievements
export const getUserAchievements = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*, badges(*)')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }
};

export default supabase; 