
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Trash2, Download, Shield, Bell, Info } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { clearSession, careerInterests } = useSession();
  
  const handleClearSession = () => {
    clearSession();
    toast({
      title: "Session cleared",
      description: "All your chat history has been removed from this device.",
    });
  };
  
  const handleDownloadData = () => {
    const sessionData = localStorage.getItem('careerCompanionMessages');
    const interests = localStorage.getItem('careerCompanionInterests');
    
    if (!sessionData && !interests) {
      toast({
        title: "No data available",
        description: "There is no data to download.",
        variant: "destructive",
      });
      return;
    }
    
    const dataStr = JSON.stringify({
      messages: sessionData ? JSON.parse(sessionData) : [],
      interests: interests ? JSON.parse(interests) : [],
    });
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'career-companion-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data downloaded",
      description: "Your data has been downloaded to your device.",
    });
  };
  
  const handleStartOver = () => {
    // Clear everything and redirect to Welcome screen
    localStorage.clear();
    navigate('/');
    
    toast({
      title: "Started over",
      description: "All data has been cleared. You can set up your preferences again.",
    });
  };

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm">
        <div className="container max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">Settings</h1>
        </div>
      </header>
      
      {/* Settings Content */}
      <div className="flex-1 p-4">
        <div className="container max-w-md mx-auto space-y-4">
          {/* Privacy Section */}
          <div className="bg-white rounded-xl border border-career-soft p-4">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={20} className="text-career-primary" />
              <h2 className="font-semibold text-career-dark">Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-career-dark">Store data on this device</p>
                  <p className="text-xs text-career-neutralGray">Keep session data for continuity</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Button
                variant="outline"
                className="w-full border-career-soft text-career-dark"
                onClick={handleDownloadData}
              >
                <Download size={16} className="mr-2" />
                Download my data
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-career-soft text-career-dark"
                onClick={handleClearSession}
              >
                <Trash2 size={16} className="mr-2" />
                Clear chat history
              </Button>
            </div>
          </div>
          
          {/* Preferences Section */}
          <div className="bg-white rounded-xl border border-career-soft p-4">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} className="text-career-primary" />
              <h2 className="font-semibold text-career-dark">Preferences</h2>
            </div>
            
            <div>
              <p className="text-career-dark mb-2">Selected career interests:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {careerInterests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-career-soft text-career-secondary px-3 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              
              <Button 
                variant="outline"
                className="w-full border-career-soft text-career-dark"
                onClick={() => navigate('/')}
              >
                Update interests
              </Button>
            </div>
          </div>
          
          {/* About Section */}
          <div className="bg-white rounded-xl border border-career-soft p-4">
            <div className="flex items-center gap-2 mb-4">
              <Info size={20} className="text-career-primary" />
              <h2 className="font-semibold text-career-dark">About</h2>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm text-career-neutralGray">
                Career Companion is an AI-powered career guidance assistant designed specifically for women in their professional journey.
              </p>
              
              <p className="text-sm text-career-neutralGray">
                Version 1.0 | A Jobs For Her Foundation Project
              </p>
            </div>
          </div>
          
          {/* Start Over */}
          <div className="pt-4">
            <Button 
              variant="destructive"
              className="w-full"
              onClick={handleStartOver}
            >
              Start Over
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Settings;
