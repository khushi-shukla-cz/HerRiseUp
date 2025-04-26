
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BookOpen, Briefcase, Settings } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-career-soft px-2 py-3 shadow-md">
      <div className="container max-w-md mx-auto flex items-center justify-around">
        <Link 
          to="/chat" 
          className={`flex flex-col items-center p-2 ${isActive('/chat') ? 'text-career-primary' : 'text-career-neutralGray'}`}
        >
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link 
          to="/resources" 
          className={`flex flex-col items-center p-2 ${isActive('/resources') ? 'text-career-primary' : 'text-career-neutralGray'}`}
        >
          <BookOpen size={24} />
          <span className="text-xs mt-1">Resources</span>
        </Link>
        <Link 
          to="/jobs" 
          className={`flex flex-col items-center p-2 ${isActive('/jobs') ? 'text-career-primary' : 'text-career-neutralGray'}`}
        >
          <Briefcase size={24} />
          <span className="text-xs mt-1">Jobs</span>
        </Link>
        <Link 
          to="/settings" 
          className={`flex flex-col items-center p-2 ${isActive('/settings') ? 'text-career-primary' : 'text-career-neutralGray'}`}
        >
          <Settings size={24} />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
