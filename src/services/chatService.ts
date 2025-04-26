import { v4 as uuidv4 } from 'uuid';

// Mock data for initial development
const JOB_LISTINGS = [
  {
    id: "job1",
    title: "Senior Product Manager",
    company: "TechCorp",
    location: "Remote",
    description: "Lead product strategy for our SaaS platform...",
    skills: ["Product Strategy", "Agile", "Data Analysis"],
    salary: "$120,000 - $150,000"
  },
  {
    id: "job2",
    title: "Marketing Director",
    company: "Brand Innovations",
    location: "Mumbai, India",
    description: "Drive marketing strategy and brand growth...",
    skills: ["Brand Strategy", "Team Leadership", "Digital Marketing"],
    salary: "$90,000 - $120,000"
  },
  {
    id: "job3",
    title: "Full Stack Developer",
    company: "WebSolutions",
    location: "Bangalore, India",
    description: "Build scalable web applications using modern technologies...",
    skills: ["React", "Node.js", "MongoDB"],
    salary: "$80,000 - $100,000"
  }
];

const CAREER_RESOURCES = [
  {
    id: "res1",
    title: "Negotiation Skills for Women in Tech",
    source: "LinkedIn Learning",
    url: "#",
    type: "Course"
  },
  {
    id: "res2",
    title: "Resume Building Workshop",
    source: "JobsForHer",
    url: "#",
    type: "Workshop"
  },
  {
    id: "res3",
    title: "Returning to Work After a Career Break",
    source: "Harvard Business Review",
    url: "#",
    type: "Article"
  }
];

// Common career questions and predefined responses
const CAREER_FAQ = {
  "resume": {
    keywords: ["resume", "cv", "curriculum vitae"],
    response: "For a strong resume, focus on achievements rather than duties. Include metrics when possible, and tailor it to each job application. Would you like me to suggest some resume templates or review services?"
  },
  "interview": {
    keywords: ["interview", "interviews", "interviewing"],
    response: "Interview preparation should include researching the company, preparing stories about your achievements, and practicing common questions. Would you like some industry-specific interview questions to practice?"
  },
  "career change": {
    keywords: ["career change", "switch careers", "new industry"],
    response: "When changing careers, identify transferable skills from your current role. Consider taking courses to build new relevant skills, and highlight adaptability in your applications. Would you like some resources on successful career transitions?"
  }
};

// Process user message and generate a response
export const processMessage = async (message: string, sessionId: string, interests: string[]) => {
  // Simple NLP to determine the intent of the user's message
  const lowerMessage = message.toLowerCase();
  
  // Check if it's a question about resumes
  if (CAREER_FAQ.resume.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return CAREER_FAQ.resume.response;
  }
  
  // Check if it's about interviews
  if (CAREER_FAQ.interview.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return CAREER_FAQ.interview.response;
  }
  
  // Check if it's about career changes
  if (CAREER_FAQ["career change"].keywords.some(keyword => lowerMessage.includes(keyword))) {
    return CAREER_FAQ["career change"].response;
  }
  
  // Check if it's about job listings
  if (lowerMessage.includes("job") || lowerMessage.includes("position") || lowerMessage.includes("opening")) {
    return `I found some job listings that might interest you. You can view them in the Jobs tab. Based on your interests, I'd recommend checking out the ${JOB_LISTINGS[0].title} position at ${JOB_LISTINGS[0].company}.`;
  }
  
  // Check if it's about learning resources
  if (lowerMessage.includes("learn") || lowerMessage.includes("course") || lowerMessage.includes("resource")) {
    return `I can recommend some learning resources for your professional development. Check out "${CAREER_RESOURCES[0].title}" on ${CAREER_RESOURCES[0].source}. Would you like more recommendations?`;
  }
  
  // Default response for other queries
  return "I'm your Career Companion, focused on helping you with your professional development. I can assist with resume advice, interview preparation, job searches, and finding learning resources. How can I support your career goals today?";
};

// Get job listings based on filters
export const getJobListings = async (filters = {}) => {
  // In a real app, this would make an API call with the filters
  return JOB_LISTINGS;
};

// Get career resources
export const getCareerResources = async () => {
  // In a real app, this would make an API call
  return CAREER_RESOURCES;
};

// Get suggested questions based on conversation context
export const getSuggestedQuestions = (interests: string[]) => {
  const generalQuestions = [
    "How can I improve my resume?",
    "What interview questions should I prepare for?",
    "How do I negotiate salary?",
    "Tips for networking effectively?"
  ];
  
  const interestBasedQuestions: string[] = [];
  
  // Add interest-specific questions
  if (interests.includes("Technology")) {
    interestBasedQuestions.push("What skills are in demand for tech roles?");
    interestBasedQuestions.push("How do I transition into a tech career?");
  }
  
  if (interests.includes("Leadership")) {
    interestBasedQuestions.push("How can I develop my leadership skills?");
    interestBasedQuestions.push("What makes a successful woman leader?");
  }
  
  if (interests.includes("Entrepreneurship")) {
    interestBasedQuestions.push("How do I secure funding for my startup?");
    interestBasedQuestions.push("What resources exist for women entrepreneurs?");
  }
  
  // Combine general and interest-based questions, limiting to 5 total
  return [...interestBasedQuestions, ...generalQuestions].slice(0, 5);
};
