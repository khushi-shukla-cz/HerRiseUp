import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input on mount for desktop
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle typing animation
  useEffect(() => {
    if (message) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // Add haptic feedback on supported devices
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`w-full flex items-center gap-2 bg-white rounded-full 
        border-2 ${isTyping ? 'border-career-primary/70' : 'border-career-soft'} 
        shadow-sm py-2 px-3 sm:py-3 sm:px-4 
        ${disabled ? 'opacity-80' : 'hover:border-career-primary/50'} 
        transition-all duration-200 focus-within:border-career-primary/70 
        focus-within:shadow-md`}
    >
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a career question..."
        className="flex-1 bg-transparent outline-none text-career-dark 
          placeholder:text-career-neutralGray text-sm sm:text-base min-w-0 
          py-1"
        disabled={disabled}
        autoComplete="off"
      />
      <button 
        type="submit" 
        className={`text-white bg-career-primary p-1.5 sm:p-2 rounded-full 
          hover:bg-career-secondary transition-all duration-200 flex-shrink-0 
          ${!message.trim() || disabled ? 'opacity-50 cursor-not-allowed' : 'shadow-sm hover:scale-105 active:scale-95'}`}
        disabled={!message.trim() || disabled}
        aria-label="Send message"
      >
        <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
      </button>
    </form>
  );
};

export default ChatInput;
