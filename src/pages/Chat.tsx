import React, { useState, useEffect, useRef } from 'react';
import { useSession } from '@/contexts/SessionContext';
import { useAchievement } from '@/contexts/AchievementContext';
import Navigation from '@/components/layout/Navigation';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { processMessage, getSuggestedQuestions } from '@/services/chatService';
import { Button } from '@/components/ui/button';
import { ArrowDown, Award, MessageSquare, Lightbulb } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Custom CSS for scrollbar
const scrollbarStyle = `
  /* Custom scrollbar for modern browsers */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
  /* Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #ccc #f1f1f1;
  }
`;

const Chat = () => {
  const navigate = useNavigate();
  const { messages, addMessage, careerInterests } = useSession();
  const { 
    unlockBadge, 
    updateMilestoneProgress, 
    completeWeeklyGoal,
    badges
  } = useAchievement();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showBadgeButton, setShowBadgeButton] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);
  
  // Add welcome message if this is a new chat
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = `Hello! I'm your HerRiseUp. I'm here to help with your professional journey. You can ask me about resume writing, interview tips, job searching, or career development. How can I assist you today?`;
      addMessage(welcomeMessage, 'bot');
    }
  }, [messages.length, addMessage]);

  // Get suggested questions based on career interests
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (careerInterests.length > 0) {
        const questions = await getSuggestedQuestions(careerInterests);
        setSuggestedQuestions(questions);
      } else {
        setSuggestedQuestions([
          "How can I improve my resume?",
          "What are some interview tips for women?",
          "How do I negotiate salary?",
          "What skills are in demand in 2024?",
          "How can I prepare for leadership roles?"
        ]);
      }
    };
    
    fetchSuggestions();
  }, [careerInterests]);
  
  // Handle scroll events to show/hide scroll button
  useEffect(() => {
    const handleScroll = () => {
      const messagesDiv = document.getElementById('messages-container');
      if (messagesDiv) {
        const isScrollable = messagesDiv.scrollHeight > messagesDiv.clientHeight;
        const isScrolledUp = messagesDiv.scrollTop < (messagesDiv.scrollHeight - messagesDiv.clientHeight - 100);
        setShowScrollButton(isScrollable && isScrolledUp);
      }
    };
    
    const messagesDiv = document.getElementById('messages-container');
    if (messagesDiv) {
      messagesDiv.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      return () => messagesDiv.removeEventListener('scroll', handleScroll);
    }
  }, [messages]); // Re-run when messages change

  // Show badge button if we have unlocked any badges
  useEffect(() => {
    const hasUnlockedBadges = badges.some(badge => badge.unlocked);
    setShowBadgeButton(hasUnlockedBadges);
  }, [badges]);
  
  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          // Fallback method
          const messagesContainer = document.getElementById('messages-container');
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }
      } catch (error) {
        console.error('Error scrolling to bottom:', error);
        // Last resort fallback
        const messagesContainer = document.getElementById('messages-container');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }
    }, 100); // Small delay to ensure DOM is updated
  };
  
  // Additional function to force immediate scroll for new messages
  const forceScrollBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };
  
  // Update useEffect to use force scroll when new messages are added
  useEffect(() => {
    if (messages.length > 0) {
      forceScrollBottom();
      // Delayed smooth scroll for better UX
      setTimeout(scrollToBottom, 100);
    }
  }, [messages.length]);
  
  const handleSendMessage = async (message: string) => {
    // Add user message to state
    addMessage(message, 'user');
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Get response from chatbot service
      const sessionId = localStorage.getItem('careerCompanionSessionId') || '';
      const response = await processMessage(message, sessionId, careerInterests);
      
      // Check for triggers to update achievements based on message content
      checkForAchievementTriggers(message, response);
      
      // Add bot response to state
      setTimeout(() => {
        addMessage(response, 'bot');
        setIsLoading(false);
      }, 1000); // Small delay to make it feel more natural
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
      setIsLoading(false);
    }
  };
  
  const checkForAchievementTriggers = (userMessage: string, botResponse: string) => {
    // Check user message for resume-related keywords
    if (/resume|CV|curriculum vitae/i.test(userMessage)) {
      // Update resume milestone
      updateMilestoneProgress('resume-completion', 20);
      
      // Complete weekly goal for resume
      completeWeeklyGoal('update-resume');
      
      // If they've made significant progress or the message suggests completion
      if (/finished|complete|updated|ready/i.test(userMessage)) {
        unlockBadge('resume-warrior');
        toast({
          title: "🎉 Achievement Unlocked!",
          description: "You've earned the Resume Warrior badge!",
        });
      }
    }
    
    // Check for interview-related keywords
    if (/interview|prepare|practice question/i.test(userMessage)) {
      updateMilestoneProgress('interview-prep', 1);
      completeWeeklyGoal('interview-practice');
      
      if (messages.filter(m => /interview/i.test(m.content)).length >= 5) {
        unlockBadge('interview-challenger');
        toast({
          title: "🎉 Achievement Unlocked!",
          description: "You've earned the Interview Challenger badge!",
        });
      }
    }
    
    // Check for job search related queries
    if (/job|position|opening|apply|application/i.test(userMessage)) {
      updateMilestoneProgress('job-applications', 1);
      completeWeeklyGoal('search-jobs');
    }
    
    // Check for skill development
    if (/learn|course|skill|training|workshop/i.test(userMessage)) {
      updateMilestoneProgress('skill-development', 1);
      completeWeeklyGoal('learn-skill');
    }
  };

  const navigateToProgress = () => {
    navigate('/progress');
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="h-screen flex flex-col bg-career-softGray">
      <style>{scrollbarStyle}</style>
      
      {/* Header */}
      <div className="flex-shrink-0">
        <PageHeader title="HerRiseUp">
          {showBadgeButton && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={navigateToProgress}
              className="text-career-primary"
            >
              <Award className="h-5 w-5" />
            </Button>
          )}
        </PageHeader>
      </div>
      
      {/* Main content area - Takes all available space between header and navigation */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden mb-[60px]">
        {/* Messages container */}
        <div className="flex-1 relative overflow-hidden">
          {/* Scrollable messages area */}
          <div 
            id="messages-container"
            className="absolute inset-0 overflow-y-auto py-4 px-4 custom-scrollbar"
            style={{ paddingBottom: "100px" }}
          >
            <div className="max-w-3xl mx-auto space-y-4 pb-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  role={message.role} 
                  content={message.content} 
                  timestamp={new Date(message.timestamp)}
                />
              ))}
              
              {isLoading && (
                <div className="flex justify-start my-2">
                  <div className="chat-bubble chat-bubble-bot">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-career-primary animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-career-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-career-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} className="h-20" />
            </div>
          </div>
          
          {/* Input area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-career-soft bg-white z-30 shadow-lg">
            <div className="flex flex-col max-w-3xl mx-auto">
              <div className="text-xs text-career-neutralGray text-center mb-1">
                Type your career question below
              </div>
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>
          </div>
        </div>
        
        {/* Suggestions Panel */}
        <div className="hidden md:block w-80 xl:w-96 border-l border-career-soft bg-white overflow-hidden">
          <div className="h-full overflow-y-auto custom-scrollbar p-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-career-secondary" />
                  Suggested Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2 px-3 font-normal text-sm hover:bg-career-soft/20 hover:text-career-primary transition-colors"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Topics */}
            <Card className="shadow-sm mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Conversations</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="text-sm text-career-neutralGray">
                  Continue exploring topics you've recently discussed.
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.from(new Set(
                    messages
                      .filter(m => m.role === 'user')
                      .slice(-10)
                      .map(m => m.content.split(' ').slice(0, 3).join(' '))
                  ))
                  .slice(0, 5)
                  .map((topic, i) => (
                    <Button 
                      key={i} 
                      variant="secondary" 
                      size="sm"
                      className="text-xs h-auto py-1"
                      onClick={() => handleSuggestedQuestion(`Tell me more about ${topic}`)}
                    >
                      {topic}...
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-4 bg-career-primary text-white rounded-full p-3 shadow-md z-50"
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      )}
      
      {/* Navigation is already fixed in its component */}
      <Navigation className="z-40" />
    </div>
  );
};

export default Chat;
