import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  // Process content to properly display new lines
  const formattedContent = content.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={`my-2 ${role === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
      <div className={`chat-bubble ${role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'} min-w-[160px]`}>
        <p className="text-sm md:text-base whitespace-pre-wrap break-words">{formattedContent}</p>
        <div className={`text-xs mt-2 ${role === 'user' ? 'text-white/70' : 'text-career-neutralGray'}`}>
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
