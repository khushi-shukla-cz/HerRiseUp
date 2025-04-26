
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface SessionContextType {
  messages: Message[];
  sessionId: string;
  careerInterests: string[];
  addMessage: (content: string, role: 'user' | 'bot') => void;
  clearSession: () => void;
  setInterests: (interests: string[]) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);

  useEffect(() => {
    // Check if there's an existing session in localStorage
    const storedSessionId = localStorage.getItem('careerCompanionSessionId');
    const storedMessages = localStorage.getItem('careerCompanionMessages');
    const storedInterests = localStorage.getItem('careerCompanionInterests');
    
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
      localStorage.setItem('careerCompanionSessionId', newSessionId);
    }
    
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Failed to parse stored messages:', error);
      }
    }
    
    if (storedInterests) {
      try {
        const parsedInterests = JSON.parse(storedInterests);
        setCareerInterests(parsedInterests);
      } catch (error) {
        console.error('Failed to parse stored interests:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('careerCompanionMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save interests to localStorage whenever they change
  useEffect(() => {
    if (careerInterests.length > 0) {
      localStorage.setItem('careerCompanionInterests', JSON.stringify(careerInterests));
    }
  }, [careerInterests]);

  const addMessage = (content: string, role: 'user' | 'bot') => {
    const newMessage: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearSession = () => {
    setMessages([]);
    localStorage.removeItem('careerCompanionMessages');
    // Generate new session ID
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    localStorage.setItem('careerCompanionSessionId', newSessionId);
  };

  const setInterests = (interests: string[]) => {
    setCareerInterests(interests);
  };

  return (
    <SessionContext.Provider
      value={{
        messages,
        sessionId,
        careerInterests,
        addMessage,
        clearSession,
        setInterests,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
