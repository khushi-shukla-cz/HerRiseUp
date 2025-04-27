import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/contexts/SessionContext';
import {
  Settings as SettingsIcon,
  LogOut,
  Download,
  Trash2,
  Shield,
  UserCog,
  Info,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PageHeader, PageContent } from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast, Toaster } from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const navigate = useNavigate();
  const { messages, clearSession } = useSession();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [actionsInProgress, setActionsInProgress] = useState<{[key: string]: boolean}>({});

  const handleClearSession = () => {
    if (showConfirmClear) {
      clearSession();
      toast.success('Session data cleared successfully!');
      setShowConfirmClear(false);
      navigate('/');
    } else {
      setShowConfirmClear(true);
    }
  };

  const handleDownloadData = () => {
    setActionsInProgress({ ...actionsInProgress, download: true });
    
    // Prepare the data to be downloaded
    const data = {
      messages: messages || [],
      preferences: {
        notificationsEnabled,
        dataCollection,
        darkMode,
        autoSave,
      },
    };
    
    // Convert the data to a JSON string
    const jsonStr = JSON.stringify(data, null, 2);
    
    // Create a blob with the data
    const blob = new Blob([jsonStr], { type: 'application/json' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'empowerHer_user_data.json';
    
    // Append the link to the body
    document.body.appendChild(a);
    
    // Click the link to start the download
    a.click();
    
    // Remove the link from the body
    document.body.removeChild(a);
    
    // Release the URL
    URL.revokeObjectURL(url);
    
    toast.success('Your data has been downloaded!');
    setActionsInProgress({ ...actionsInProgress, download: false });
  };

  const handleStartOver = () => {
    navigate('/onboarding');
  };

  const toggleSetting = (setting: string, value: boolean) => {
    switch (setting) {
      case 'notifications':
        setNotificationsEnabled(value);
        toast.success(`Notifications ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'dataCollection':
        setDataCollection(value);
        toast.success(`Data collection ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'darkMode':
        setDarkMode(value);
        toast.success(`Dark mode ${value ? 'enabled' : 'disabled'}`);
        break;
      case 'autoSave':
        setAutoSave(value);
        toast.success(`Auto-save ${value ? 'enabled' : 'disabled'}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      <Toaster position="top-center" />
      <PageHeader 
        title="Settings" 
        description="Manage your preferences and account settings"
      >
        <SettingsIcon className="w-6 h-6 text-career-primary" />
      </PageHeader>
      
      <PageContent>
        <div className="space-y-6">
          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-career-secondary" />
                Privacy & Data
              </CardTitle>
              <CardDescription>
                Manage how your data is collected and used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Data Collection */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Data Collection</h3>
                  <p className="text-sm text-career-neutralGray">
                    Allow us to collect usage data to improve your experience
                  </p>
                </div>
                <Switch
                  checked={dataCollection}
                  onCheckedChange={(checked) => toggleSetting('dataCollection', checked)}
                />
              </div>
              
              <Separator />
              
              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-career-neutralGray">
                    Receive updates about new job opportunities and tips
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={(checked) => toggleSetting('notifications', checked)}
                />
              </div>
              
              <Separator />
              
              {/* Download Data */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Download Your Data</h3>
                  <p className="text-sm text-career-neutralGray">
                    Get a copy of all your data stored in this application
                  </p>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleDownloadData}
                  disabled={actionsInProgress.download}
                >
                  {actionsInProgress.download ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </Button>
              </div>
              
              <Separator />
              
              {/* Clear Session */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Clear Session Data</h3>
                  <p className="text-sm text-career-neutralGray">
                    {showConfirmClear 
                      ? "Are you sure? This will delete all your session data."
                      : "Remove all your session data from this device"}
                  </p>
                </div>
                <Button 
                  variant={showConfirmClear ? "destructive" : "outline"}
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleClearSession}
                >
                  {showConfirmClear ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Clear Data</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCog className="w-5 h-5 mr-2 text-career-secondary" />
                User Preferences
              </CardTitle>
              <CardDescription>
                Customize your application experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-career-neutralGray">
                    Switch between light and dark theme
                  </p>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={(checked) => toggleSetting('darkMode', checked)}
                />
              </div>
              
              <Separator />
              
              {/* Auto-save Drafts */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-save Drafts</h3>
                  <p className="text-sm text-career-neutralGray">
                    Automatically save your progress on forms and applications
                  </p>
                </div>
                <Switch
                  checked={autoSave}
                  onCheckedChange={(checked) => toggleSetting('autoSave', checked)}
                />
              </div>
              
              <Separator />
              
              {/* Start Over */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Start Over</h3>
                  <p className="text-sm text-career-neutralGray">
                    Return to the onboarding process to reset your preferences
                  </p>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleStartOver}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Start Over</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-career-secondary" />
                About
              </CardTitle>
              <CardDescription>
                Information about this application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Version</h3>
                  <span className="text-sm text-career-neutralGray">1.0.0</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Last Updated</h3>
                  <span className="text-sm text-career-neutralGray">May 2024</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3 pt-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => window.open('https://www.example.com/terms', '_blank')}
                >
                  <span className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Terms of Service
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => window.open('https://www.example.com/privacy', '_blank')}
                >
                  <span className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-between"
                  onClick={() => window.open('https://www.example.com/feedback', '_blank')}
                >
                  <span className="flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Send Feedback
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-xs text-career-neutralGray">
                  EmpowerHer Career Assistant &copy; 2024
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Sign Out Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 border-career-danger text-career-danger hover:bg-career-danger/10"
            onClick={() => {
              clearSession();
              navigate('/');
              toast.success('You have been signed out');
            }}
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </PageContent>
      
      <Navigation />
    </div>
  );
};

export default Settings;
