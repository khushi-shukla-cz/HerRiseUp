import React from 'react';
import { BookOpen, Video, FileText, Calendar, Users } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  source: string;
  url: string;
  type: 'Course' | 'Workshop' | 'Article' | 'Event' | 'Community' | string;
  typeUrl?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, source, url, type, typeUrl }) => {
  const getIcon = () => {
    switch (type) {
      case 'Course':
        return <Video size={20} className="text-career-primary" />;
      case 'Workshop':
        return <BookOpen size={20} className="text-career-primary" />;
      case 'Event':
        return <Calendar size={20} className="text-career-primary" />;
      case 'Community':
        return <Users size={20} className="text-career-primary" />;
      default:
        return <FileText size={20} className="text-career-primary" />;
    }
  };

  const handleTypeClick = (e: React.MouseEvent) => {
    if (typeUrl) {
      e.stopPropagation();
      window.open(typeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white rounded-xl border border-career-soft p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h3 className="font-medium text-career-dark">{title}</h3>
          <p className="text-sm text-career-secondary mt-1">{source}</p>
          <div className="mt-2">
            <span 
              onClick={handleTypeClick}
              className={`text-xs bg-career-soft text-career-secondary px-2 py-1 rounded-full ${typeUrl ? 'cursor-pointer hover:bg-career-primary hover:text-white' : ''}`}
            >
              {type}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
