
import React, { useState, useEffect, useRef } from 'react';
import { useSession } from '@/contexts/SessionContext';
import Navigation from '@/components/layout/Navigation';
import ChatMessage from '@/components/chat/ChatMessage';
import SuggestionChips from '@/components/chat/SuggestionChips';
import ChatInput from '@/components/chat/ChatInput';
import { processMessage, getSuggestedQuestions } from '@/services/chatService';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Chat = () => {
  const { messages, addMessage, careerInterests } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  // Get suggestions based on interests
  useEffect(() => {
    if (careerInterests.length > 0) {
      const questionSuggestions = getSuggestedQuestions(careerInterests);
      setSuggestions(questionSuggestions);
    }
  }, [careerInterests]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Add welcome message if this is a new chat
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = `Hello! I'm your Career Companion. I'm here to help with your professional journey. You can ask me about resume writing, interview tips, job searching, or career development. How can I assist you today?`;
      addMessage(welcomeMessage, 'bot');
    }
  }, []);
  
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
      return () => messagesDiv.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (message: string) => {
    // Add user message to state
    addMessage(message, 'user');
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Get response from chatbot service
      const sessionId = localStorage.getItem('careerCompanionSessionId') || '';
      const response = await processMessage(message, sessionId, careerInterests);
      
      // Add bot response to state
      setTimeout(() => {
        addMessage(response, 'bot');
        setIsLoading(false);
      }, 1000); // Small delay to make it feel more natural
      
      // Update suggestions
      setSuggestions(getSuggestedQuestions(careerInterests));
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm">
        <div className="container max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">Career Companion</h1>
        </div>
      </header>
      
      {/* Messages container */}
      <div 
        id="messages-container"
        className="flex-1 overflow-y-auto py-4 px-4"
        style={{ paddingBottom: '8rem' }} // Extra padding to account for the input and bottom nav
      >
        <div className="container max-w-md mx-auto">
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
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-32 right-4 bg-career-primary text-white rounded-full p-2 shadow-md"
        >
          <ArrowDown size={20} />
        </button>
      )}
      
      {/* Suggestions and input container */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-career-soft py-3 px-4">
        <div className="container max-w-md mx-auto">
          <SuggestionChips 
            suggestions={suggestions} 
            onSelectSuggestion={handleSuggestionClick} 
          />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Chat;
