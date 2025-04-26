
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  return (
    <div className={`my-2 ${role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`chat-bubble ${role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
        <p className="text-sm md:text-base">{content}</p>
        <div className={`text-xs mt-1 ${role === 'user' ? 'text-white/70' : 'text-career-neutralGray'}`}>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
