
import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  source: string;
  url: string;
  type: 'Course' | 'Workshop' | 'Article' | string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, source, url, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'Course':
        return <Video size={20} className="text-career-primary" />;
      case 'Workshop':
        return <BookOpen size={20} className="text-career-primary" />;
      default:
        return <FileText size={20} className="text-career-primary" />;
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
        <div>
          <h3 className="font-medium text-career-dark">{title}</h3>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-career-secondary">{source}</p>
            <span className="text-xs bg-career-soft text-career-secondary px-2 py-1 rounded-full">{type}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
