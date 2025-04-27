import React from 'react';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, ChevronRight, MessageSquare, Video, FileText, Clock, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterviewPrep = () => {
  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm">
        <div className="container max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">Interview Preparation</h1>
        </div>
      </header>

      <div className="flex-1 px-4 py-6">
        <div className="container max-w-md mx-auto space-y-6">
          {/* Introduction */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h2 className="text-lg font-bold text-career-primary mb-2">
                Mastering the Interview: A Woman's Guide to Career Success
              </h2>
              <p className="text-career-neutralGray">
                Job interviews can be both exciting and nerve-wracking, especially for women navigating 
                various workplace dynamics. This comprehensive guide will help you prepare effectively, 
                showcase your strengths, and handle challenging situations with confidence.
              </p>
            </CardContent>
          </Card>

          {/* Before the Interview */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <Clock className="w-5 h-5 mr-2 text-career-secondary" />
                Before the Interview
              </h3>
              
              <h4 className="text-career-secondary font-medium mt-4">Research is Your Foundation</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Research the company thoroughly: mission, values, recent news, and key projects</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Study the job description and identify key skills and qualifications</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Research your interviewers on LinkedIn if possible</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Understand the company's industry position and competitors</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Prepare Your Narrative</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Craft a clear 1-2 minute "tell me about yourself" response</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Prepare 5-7 accomplishment stories using the STAR method (Situation, Task, Action, Result)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Quantify your achievements with specific numbers and metrics</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Practice Makes Perfect</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Conduct mock interviews with a friend or mentor</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Record yourself to review your body language and verbal patterns</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Practice answering common questions while avoiding filler words</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Prepare for Virtual Interviews</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Test your technology beforehand (camera, microphone, internet)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Set up proper lighting and a professional background</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Eliminate potential distractions in your environment</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* During the Interview */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-career-secondary" />
                During the Interview
              </h3>
              
              <h4 className="text-career-secondary font-medium mt-4">First Impressions Count</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Arrive 10-15 minutes early (or be ready online ahead of time)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Dress one level above the company dress code</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Greet everyone with confidence, warmth, and a firm handshake</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Communication Excellence</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Speak clearly and at a measured pace</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Listen actively and don't interrupt</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Use professional but conversational language</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Maintain good eye contact without staring</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Answering Questions</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Be concise but thorough in your responses</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Use the STAR method for behavioral questions</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Be honest about your experiences while highlighting your strengths</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Pause briefly to collect your thoughts when needed</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Handling Difficult Questions</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>For salary questions, research market rates beforehand and give a range</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Frame weaknesses as areas you're actively improving</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>For employment gaps, be honest but focus on skills maintained or gained</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Ask Thoughtful Questions</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Prepare 5-7 questions about the role, team, and company culture</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Ask about success metrics and growth opportunities</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Inquire about next steps in the interview process</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Do's and Don'ts */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary mb-3">Essential Do's and Don'ts</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-green-600 font-medium flex items-center">
                    <Check className="w-5 h-5 mr-2" />
                    Do's
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm">Research the company thoroughly</li>
                    <li className="text-sm">Prepare specific examples of your achievements</li>
                    <li className="text-sm">Dress professionally and appropriately</li>
                    <li className="text-sm">Show enthusiasm and positive energy</li>
                    <li className="text-sm">Ask thoughtful questions</li>
                    <li className="text-sm">Follow up with a thank-you note</li>
                    <li className="text-sm">Speak confidently about your accomplishments</li>
                    <li className="text-sm">Bring copies of your resume and portfolio</li>
                    <li className="text-sm">Maintain good posture and eye contact</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-red-500 font-medium flex items-center">
                    <X className="w-5 h-5 mr-2" />
                    Don'ts
                  </h4>
                  <ul className="space-y-2">
                    <li className="text-sm">Arrive late or unprepared</li>
                    <li className="text-sm">Speak negatively about previous employers</li>
                    <li className="text-sm">Undersell your accomplishments</li>
                    <li className="text-sm">Check your phone during the interview</li>
                    <li className="text-sm">Interrupt the interviewer</li>
                    <li className="text-sm">Provide vague or generic answers</li>
                    <li className="text-sm">Ask about salary and benefits too early</li>
                    <li className="text-sm">Use unprofessional language or slang</li>
                    <li className="text-sm">Forget to ask about next steps</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* After the Interview */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <FileText className="w-5 h-5 mr-2 text-career-secondary" />
                After the Interview
              </h3>
              
              <ul className="space-y-2 mt-3">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Send a personalized thank-you email within 24 hours</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Reflect on your performance and note areas for improvement</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Follow up professionally if you don't hear back within the stated timeframe</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Connect with interviewers on LinkedIn with a personalized note</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Prepare for potential follow-up interviews or assessments</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Women-Specific Considerations */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <Linkedin className="w-5 h-5 mr-2 text-career-secondary" />
                Special Considerations for Women
              </h3>
              
              <h4 className="text-career-secondary font-medium mt-4">Confidence and Self-Advocacy</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Practice speaking confidently about your achievements without downplaying them</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Use "I" statements rather than "we" when discussing your accomplishments</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Come prepared with specific salary expectations based on research</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Handling Biased Questions</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>If asked about family planning, redirect to your commitment to the role</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>For questions about handling male-dominated environments, focus on your skills and achievements</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Be prepared to discuss how you've overcome challenges professionally</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Assessing Company Culture</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Ask about diversity initiatives and women in leadership positions</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Inquire about mentorship programs and professional development opportunities</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Look for signs of inclusive culture and work-life balance policies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary mb-3">Final Thoughts</h3>
              <p className="text-career-neutralGray">
                Remember that an interview is a two-way conversation. You're not just being evaluated; 
                you're also determining if this company and role are right for you. By preparing thoroughly, 
                presenting yourself confidently, and asking thoughtful questions, you'll make a strong 
                impression and gather the information you need to make the best decision for your career.
              </p>
              <p className="text-career-neutralGray mt-3">
                Each interview is a learning opportunity. Even if you don't get the job, the experience 
                and feedback can help you improve for future opportunities. Stay positive, be authentic, 
                and trust in your abilities and preparation.
              </p>
            </CardContent>
          </Card>

          {/* Link to Resume Builder */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <FileText className="w-5 h-5 mr-2 text-career-secondary" />
                Complete Your Job Application Package
              </h3>
              <p className="text-career-neutralGray mt-2">
                A great interview starts with a strong resume. Create or update yours:
              </p>
              <div className="mt-4">
                <Link 
                  to="/resume-build"
                  className="flex items-center justify-between bg-career-soft/30 p-3 rounded-lg border border-career-soft hover:bg-career-soft/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-career-primary">Resume Building Guide</h4>
                    <p className="text-sm text-career-neutralGray mt-1">Create a professional resume that gets noticed</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-career-primary" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default InterviewPrep; 