
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2 bg-white rounded-full border border-career-soft py-2 px-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask a career question..."
        className="flex-1 bg-transparent outline-none text-career-dark placeholder:text-career-neutralGray"
      />
      <button 
        type="submit" 
        className="text-career-primary p-2 rounded-full hover:bg-career-soft transition-colors"
        disabled={!message.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
