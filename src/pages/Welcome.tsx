
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const Welcome = () => {
  const navigate = useNavigate();
  const { setInterests } = useSession();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [step, setStep] = useState<number>(1);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  const careerFields = [
    "Technology", "Healthcare", "Finance", "Marketing", 
    "Human Resources", "Design", "Education", "Engineering",
    "Leadership", "Entrepreneurship", "Sales", "Customer Service"
  ];

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    
    if (selectedInterests.length > 0) {
      setInterests(selectedInterests);
      navigate('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-career-soft to-white flex flex-col">
      <div className="container max-w-md mx-auto px-4 py-10 flex-1 flex flex-col">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-career-primary">Career Companion</h1>
          <p className="text-career-secondary mt-2">Your personal guide to professional growth</p>
        </div>
        
        {/* Step 1: Introduction and Consent */}
        {step === 1 && (
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-career-dark mb-4">Welcome to Career Companion</h2>
            
            <p className="text-career-neutralGray mb-4">
              I'm your AI career assistant, designed specifically to help women navigate their professional journeys.
            </p>
            
            <p className="text-career-neutralGray mb-6">
              I can provide guidance on resume writing, interview preparation, job searching, skill development, and more.
            </p>
            
            <div className="bg-career-softGray rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium text-career-secondary mb-2">Your Privacy Matters</h3>
              <p className="text-sm text-career-neutralGray mb-4">
                Career Companion operates with a privacy-first approach:
              </p>
              <ul className="text-sm text-career-neutralGray space-y-2 mb-4">
                <li>• Your conversations are only stored in your device</li>
                <li>• No personal data is shared with third parties</li>
                <li>• You can delete all data at any time</li>
              </ul>
              
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox 
                  id="consent" 
                  checked={consentGiven}
                  onCheckedChange={(checked) => setConsentGiven(checked as boolean)}
                />
                <label 
                  htmlFor="consent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-career-secondary"
                >
                  I understand and consent to these terms
                </label>
              </div>
            </div>
            
            <Button 
              className="mt-auto bg-career-primary hover:bg-career-secondary text-white"
              onClick={handleContinue}
              disabled={!consentGiven}
            >
              Continue
            </Button>
          </div>
        )}
        
        {/* Step 2: Select Interests */}
        {step === 2 && (
          <div className="bg-white rounded-xl p-6 shadow-sm animate-fade-in flex-1 flex flex-col">
            <h2 className="text-xl font-semibold text-career-dark mb-2">Personalize Your Experience</h2>
            <p className="text-career-neutralGray mb-6">
              Select your career interests to get tailored guidance:
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {careerFields.map((field) => (
                <div
                  key={field}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedInterests.includes(field)
                      ? 'border-career-primary bg-career-soft text-career-primary'
                      : 'border-career-soft text-career-neutralGray'
                  }`}
                  onClick={() => handleInterestToggle(field)}
                >
                  {field}
                </div>
              ))}
            </div>
            
            {selectedInterests.length === 0 && (
              <p className="text-sm text-career-secondary mb-4">
                Please select at least one interest to continue
              </p>
            )}
            
            <Button
              className="mt-auto bg-career-primary hover:bg-career-secondary text-white"
              onClick={handleContinue}
              disabled={selectedInterests.length === 0}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
