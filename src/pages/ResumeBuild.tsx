import React from 'react';
import Navigation from '@/components/layout/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronRight, FileText, ListChecks, Columns, Briefcase, Award, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResumeBuild = () => {
  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm">
        <div className="container max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">Resume Builder</h1>
        </div>
      </header>

      <div className="flex-1 px-4 py-6">
        <div className="container max-w-md mx-auto space-y-6">
          {/* Introduction */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h2 className="text-lg font-bold text-career-primary mb-2">
                Craft a Powerful Resume that Gets Results
              </h2>
              <p className="text-career-neutralGray">
                Your resume is often your first impression with potential employers. This guide will help you create
                a compelling, professional resume that highlights your strengths and achievements, especially for
                women returning to the workforce or changing careers.
              </p>
            </CardContent>
          </Card>

          {/* Resume Structure */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <Columns className="w-5 h-5 mr-2 text-career-secondary" />
                Essential Resume Components
              </h3>

              <h4 className="text-career-secondary font-medium mt-4">Contact Information & Header</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Name, phone, professional email, and LinkedIn profile</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Optional: portfolio/website link (if relevant to your field)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>TIP: Use a simple, professional email address (firstname.lastname@domain.com)</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Professional Summary</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>3-4 sentences highlighting your key qualifications and career goals</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Tailor this to each job application, incorporating relevant keywords</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>TIP: For career changers or those returning after a break, focus on transferable skills</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Work Experience</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>List positions in reverse chronological order (most recent first)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Include company name, location, job title, and dates of employment</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Use bullet points (5-6 max per role) focusing on achievements, not just duties</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>TIP: Start each bullet with a strong action verb and quantify results when possible</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Education & Training</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>List degrees, certifications, and relevant coursework</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Include institution, location, degree/certification title, and completion date</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>TIP: Include relevant continuing education or professional development</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Skills Section</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>List technical skills, language proficiencies, and relevant software experience</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Group skills by category for easy scanning</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>TIP: Match skills mentioned in the job description (if you genuinely have them)</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Optional Sections</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Professional organizations and leadership roles</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Volunteer experience (especially if it demonstrates relevant skills)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Projects, publications, or presentations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resume Tips */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <ListChecks className="w-5 h-5 mr-2 text-career-secondary" />
                Resume Best Practices
              </h3>

              <h4 className="text-career-secondary font-medium mt-4">Formatting Guidelines</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Keep your resume to 1-2 pages (1 page for less than 10 years of experience)</span>
                </li>
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Use a clean, professional font like Arial, Calibri, or Georgia at 10-12pt size</span>
                </li>
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Include adequate white space and consistent formatting throughout</span>
                </li>
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Save and send as a PDF unless specifically requested in another format</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Content Advice</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Use action verbs (Led, Created, Implemented, Achieved, etc.)</span>
                </li>
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Quantify achievements with numbers (Increased sales by 20%, Managed team of 15)</span>
                </li>
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Tailor your resume for each position, highlighting relevant experience</span>
                </li>
                <li className="flex">
                  <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Use industry-specific keywords (especially those in the job description)</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">Common Mistakes to Avoid</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Including personal information (age, marital status, photo)</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Using generic objective statements or outdated formats</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Listing duties without highlighting accomplishments</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Typos, grammatical errors, or inconsistent formatting</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Addressing Career Gaps */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <Award className="w-5 h-5 mr-2 text-career-secondary" />
                Handling Career Gaps & Transitions
              </h3>
              
              <p className="text-career-neutralGray mt-2">
                Women often face unique challenges when it comes to career gaps for childcare, family 
                responsibilities, or other life circumstances. Here's how to address them effectively:
              </p>

              <h4 className="text-career-secondary font-medium mt-4">For Career Gaps</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Consider a functional or hybrid resume format to highlight skills over chronology</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Include relevant volunteer work, freelance projects, or education during the gap</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Be prepared to explain gaps positively in your cover letter or interview</span>
                </li>
              </ul>

              <h4 className="text-career-secondary font-medium mt-4">For Career Transitions</h4>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Emphasize transferable skills relevant to your target position</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Highlight coursework, certifications, or projects in your new field</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Use your professional summary to explain your transition and unique value</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Resume Templates & Tools */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <FileText className="w-5 h-5 mr-2 text-career-secondary" />
                Resume Templates & Tools
              </h3>
              
              <p className="text-career-neutralGray mt-2">
                Get started with these professional resume templates and online tools:
              </p>

              <div className="mt-4 space-y-4">
                <div className="bg-career-soft/20 p-3 rounded-lg border border-career-soft">
                  <h4 className="font-medium text-career-primary">Professional Templates</h4>
                  <p className="text-sm text-career-neutralGray mt-1">Modern, ATS-friendly resume templates in various formats.</p>
                  <a 
                    href="https://resume.io/resume-templates/professional?ga_utm_source=bing&utm_medium=ppc&utm_campaign=434120185&utm_adgroup=1258941445431087&utm_custom=Resume.io|IN|PS|NB&utm_content=78683999662659&utm_term=professional%20resume%20template&matchtype=e&device=c&location=154691&msclkid=521eb07da49210ebcb56d873e8616d0a" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-career-primary text-sm"
                  >
                    View Templates <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="bg-career-soft/20 p-3 rounded-lg border border-career-soft">
                  <h4 className="font-medium text-career-primary">Canva Resume Builder</h4>
                  <p className="text-sm text-career-neutralGray mt-1">Create visually appealing resumes with easy-to-use templates.</p>
                  <a 
                    href="https://www.canva.com/resumes/templates/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-career-primary text-sm"
                  >
                    Try Canva <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="bg-career-soft/20 p-3 rounded-lg border border-career-soft">
                  <h4 className="font-medium text-career-primary">Resume Keyword Checker</h4>
                  <p className="text-sm text-career-neutralGray mt-1">Analyze how well your resume matches job descriptions.</p>
                  <a 
                    href="https://www.jobscan.co/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-career-primary text-sm"
                  >
                    Check Keywords <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>

                <div className="bg-career-soft/20 p-3 rounded-lg border border-career-soft">
                  <h4 className="font-medium text-career-primary">LinkedIn Profile Optimizer</h4>
                  <p className="text-sm text-career-neutralGray mt-1">Make your LinkedIn profile complement your resume.</p>
                  <a 
                    href="https://careerhelp.resumegemini.com/careertips/6-career-boosting-linkedin-profile-optimization-tips/?utm_campaign=MSGS2&msclkid=ec3adea4fba312556dceb6aab5b22d63" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-career-primary text-sm"
                  >
                    LinkedIn Tips <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expert Review */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary mb-3">Get Expert Feedback</h3>
              <p className="text-career-neutralGray">
                Once you've drafted your resume, consider getting professional feedback to make it even stronger:
              </p>
              <ul className="space-y-2 mt-2">
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Ask a mentor or colleague in your industry to review it</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Consider a professional resume review service</span>
                </li>
                <li className="flex">
                  <ChevronRight className="w-4 h-4 mr-2 text-career-primary flex-shrink-0 mt-0.5" />
                  <span>Join professional networks specific to women in your field for peer feedback</span>
                </li>
              </ul>
              <p className="text-career-neutralGray mt-3">
                Remember that your resume is a living document that should be regularly updated as you grow professionally.
              </p>
            </CardContent>
          </Card>

          {/* Link to Interview Prep */}
          <Card>
            <CardContent className="prose prose-sm pt-6">
              <h3 className="text-md font-bold text-career-primary flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-career-secondary" />
                Next Steps
              </h3>
              <p className="text-career-neutralGray mt-2">
                After crafting a strong resume, prepare for interview success:
              </p>
              <div className="mt-4">
                <Link 
                  to="/interview-prep"
                  className="flex items-center justify-between bg-career-soft/30 p-3 rounded-lg border border-career-soft hover:bg-career-soft/50 transition-colors"
                >
                  <div>
                    <h4 className="font-medium text-career-primary">Interview Preparation Guide</h4>
                    <p className="text-sm text-career-neutralGray mt-1">Learn how to ace your job interviews</p>
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

export default ResumeBuild; 