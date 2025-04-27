import { v4 as uuidv4 } from 'uuid';
import { getAIResponse } from './externalApiService';
import { allCareerQuestions, findAnswerByQuestion } from '../data/careerQuestionsIndex';

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
  },
  "salary": {
    keywords: ["salary", "compensation", "pay", "negotiate", "offer", "money"],
    response: "When negotiating salary, research industry standards first. Highlight your unique value and achievements. Consider the full compensation package, not just base salary. Remember that negotiating is expected and professional."
  },
  "work-life balance": {
    keywords: ["balance", "burnout", "stress", "overwhelmed", "time management"],
    response: "For better work-life balance, set clear boundaries between work and personal time. Schedule breaks and self-care. Prioritize tasks with high impact. Consider discussing flexible arrangements with your employer if possible."
  },
  "networking": {
    keywords: ["network", "connections", "linkedin", "connect"],
    response: "Effective networking includes joining professional associations, attending industry events, being active on LinkedIn, and scheduling informational interviews. Focus on building meaningful connections rather than just collecting contacts."
  },
  "leadership": {
    keywords: ["leadership", "lead", "manage", "team", "leader"],
    response: "Key leadership skills include clear communication, active listening, strategic thinking, and emotional intelligence. To develop these abilities, seek mentorship, take on stretch assignments, and consider leadership training programs designed for women."
  }
};

// API key for external AI service (in a real app, this would be stored securely, not in the code)
const API_KEY = "dummy-key-would-be-replaced-with-real-key";

// Function to determine if a question is career-related
const isCareerRelated = (message: string): boolean => {
  const careerTerms = [
    "job", "career", "work", "professional", "resume", "cv", "interview", 
    "salary", "employer", "employee", "workplace", "office", "position",
    "promotion", "skills", "employment", "networking", "linkedin", "boss", 
    "colleagues", "profession", "occupation", "industry", "business"
  ];
  
  const lowerMessage = message.toLowerCase();
  return careerTerms.some(term => lowerMessage.includes(term));
};

// Process user message and generate a response
export const processMessage = async (message: string, sessionId: string, interests: string[]) => {
  const lowerMessage = message.toLowerCase();
  
  // Check for career-specific FAQ responses
  for (const category in CAREER_FAQ) {
    if (CAREER_FAQ[category].keywords.some(keyword => lowerMessage.includes(keyword))) {
      return CAREER_FAQ[category].response;
    }
  }
  
  // Check if it's about job listings
  if (lowerMessage.includes("job") || lowerMessage.includes("position") || lowerMessage.includes("opening") || 
      lowerMessage.includes("hiring") || lowerMessage.includes("employment")) {
    return `I found some job listings that might interest you. You can view them in the Jobs tab. Based on your interests, I'd recommend checking out the ${JOB_LISTINGS[0].title} position at ${JOB_LISTINGS[0].company}. The role requires skills in ${JOB_LISTINGS[0].skills.join(", ")} and offers ${JOB_LISTINGS[0].salary}.`;
  }
  
  // Check if it's about learning resources
  if (lowerMessage.includes("learn") || lowerMessage.includes("course") || lowerMessage.includes("resource") || 
      lowerMessage.includes("training") || lowerMessage.includes("workshop")) {
    return `I can recommend some learning resources for your professional development. Check out "${CAREER_RESOURCES[0].title}" on ${CAREER_RESOURCES[0].source}. We also have resources about resume building and returning to work after a career break. What specific skills are you looking to develop?`;
  }
  
  // Respond to questions about discrimination or bias
  if (lowerMessage.includes("discrimination") || lowerMessage.includes("bias") || lowerMessage.includes("sexism") || 
      lowerMessage.includes("harassment") || lowerMessage.includes("inequality")) {
    return "If you're experiencing workplace discrimination: 1) Document incidents with details, 2) Check your company's policies, 3) Connect with trusted colleagues for support, 4) Consider speaking with HR, and 5) Know your legal rights. Organizations like Women's Legal Aid can provide specific guidance.";
  }
  
  // Respond to questions about returning to work
  if (lowerMessage.includes("return to work") || lowerMessage.includes("career break") || lowerMessage.includes("gap") || 
      lowerMessage.includes("maternity") || lowerMessage.includes("break")) {
    return "When returning after a career break: Update your skills through courses, refresh your network by reconnecting with colleagues, update your resume focusing on skills, and consider returnship programs designed for returners. Many companies now value and support returning professionals.";
  }
  
  // Respond to questions about self-confidence
  if (lowerMessage.includes("confidence") || lowerMessage.includes("imposter syndrome") || lowerMessage.includes("self-doubt") || 
      lowerMessage.includes("insecure") || lowerMessage.includes("not good enough")) {
    return "Many successful women experience imposter syndrome. Build confidence by documenting your achievements, seeking feedback, finding mentors, practicing positive self-talk, and celebrating your wins. Remember that feeling uncertain doesn't mean you're not capable.";
  }
  
  // Respond to greetings
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey") || 
      lowerMessage === "hi" || lowerMessage === "hello") {
    return "Hello! I'm your HerRiseUp career assistant. I'm here to help with your professional journey. What career questions can I answer for you today?";
  }
  
  // Respond to thank you messages
  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about your career journey?";
  }
  
  // Handle general questions with interest-based responses
  if (isCareerRelated(message) && interests.length > 0 && 
     (lowerMessage.includes("how") || lowerMessage.includes("what") || 
      lowerMessage.includes("why") || lowerMessage.includes("advice") || lowerMessage.includes("tips"))) {
    const randomInterest = interests[Math.floor(Math.random() * interests.length)];
    return `Based on your interest in ${randomInterest}, I can help with your question. Many women in ${randomInterest} find success through continuous learning and mentorship. Would you like more specific advice about careers in ${randomInterest}?`;
  }
  
  // For questions about the app/assistant
  if (lowerMessage.includes("what can you do") || lowerMessage.includes("how do you") || 
      lowerMessage.includes("who are you") || lowerMessage.includes("about you")) {
    return "I'm HerRiseUp, your AI career assistant designed specifically for women. I can help with resume advice, interview preparation, job searching, networking tips, career transitions, work-life balance, and professional development resources. I can also answer general questions on virtually any topic!";
  }
  
  // For non-career questions, use the external AI API
  try {
    // Use the external API service to get responses for general knowledge questions
    return await getAIResponse(message);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    
    // Fallback for when API call fails
    const fallbackResponses = [
      "I'd be happy to help with that. Could you provide a bit more detail about what you're looking for?",
      "That's an interesting question. To give you the best answer, could you tell me more about what you're trying to learn?",
      "I want to provide helpful guidance. Could you rephrase your question with some additional context?",
      "I'm here to support you. To better assist you, could you share more details about your question?"
    ];
    
    // Return a random fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
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
    "Tips for networking effectively?",
    "How to achieve better work-life balance?",
    "How to overcome imposter syndrome?",
    "How to handle workplace discrimination?"
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
  
  if (interests.includes("Finance")) {
    interestBasedQuestions.push("How can I break into the finance industry?");
    interestBasedQuestions.push("What certifications are valued in finance?");
  }
  
  if (interests.includes("Healthcare")) {
    interestBasedQuestions.push("What are growing roles in healthcare?");
    interestBasedQuestions.push("How to balance healthcare career and personal life?");
  }
  
  if (interests.includes("Marketing")) {
    interestBasedQuestions.push("What digital marketing skills are most valuable?");
    interestBasedQuestions.push("How to build a personal brand in marketing?");
  }
  
  // Combine general and interest-based questions, limiting to 5 total
  return [...interestBasedQuestions, ...generalQuestions].slice(0, 5);
};

/**
 * Get the answer to a career question if it exists in our database
 * @param questionText The question to search for
 * @returns The answer if found, null otherwise
 */
export const getCareerQuestionAnswer = (questionText: string): string | null => {
  return findAnswerByQuestion(questionText);
};

/**
 * Handles general (non-career specific) questions by connecting to external AI service
 * @param message The user's message to get a response for
 * @returns A promise that resolves to the AI's response for general knowledge questions
 */
export const getAIResponseGeneral = async (message: string): Promise<string> => {
  try {
    // Use the external API service to get responses for general knowledge questions
    return await getAIResponse(message);
  } catch (error) {
    console.error("Error fetching from external AI API:", error);
    
    // Fallback responses for when the API call fails
    const fallbackResponses = [
      "I'd be happy to help with that general question. Could you provide a bit more detail about what you're looking for?",
      "That's an interesting question. To give you the best answer, could you tell me more about what you're trying to learn?",
      "I want to provide helpful guidance on your question. Could you rephrase it with some additional context?",
      "I'm here to support you with both career and general knowledge. To better assist, could you share more details?"
    ];
    
    // Return a random fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};

/**
 * Checks if the user message matches any of our prepared career questions
 * @param userMessage The message to check
 * @returns The matching question if found, null otherwise
 */
export const findMatchingCareerQuestion = (userMessage: string): { question: string, answer: string } | null => {
  // Convert user message to lowercase for case-insensitive matching
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  // First try exact matching
  const exactMatch = allCareerQuestions.find(
    q => q.question.toLowerCase() === normalizedMessage
  );
  
  if (exactMatch) {
    return exactMatch;
  }
  
  // Then try fuzzy matching (if question is contained in message or vice versa)
  const fuzzyMatch = allCareerQuestions.find(q => {
    const normalizedQuestion = q.question.toLowerCase();
    return normalizedMessage.includes(normalizedQuestion) || 
           normalizedQuestion.includes(normalizedMessage);
  });
  
  return fuzzyMatch || null;
};

/**
 * Generate a response based on the user's message
 * @param message The user's message
 * @param interests The user's career interests
 * @returns A response to the user's message
 */
export const generateResponse = async (message: string, interests: string[]): Promise<string> => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Handle greetings
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "what's up", "howdy"];
  const howAreYou = ["how are you", "how are u", "how r u", "how is it going", "how's it going", "how are things"];
  
  if (greetings.some(greeting => lowerMessage === greeting || lowerMessage.startsWith(greeting + " "))) {
    return "Hello! I'm your career companion assistant. I can help with job search advice, resume tips, interview preparation, and career development. What would you like to know today?";
  }
  
  if (howAreYou.some(phrase => lowerMessage.includes(phrase))) {
    return "I'm doing well, thank you for asking! I'm ready to help with your career questions. What can I assist you with today?";
  }

  // Check if the message matches any of our prepared career questions
  const matchingQuestion = findMatchingCareerQuestion(message);
  if (matchingQuestion) {
    return matchingQuestion.answer;
  }
  
  // Check for career-specific FAQ responses
  for (const category in CAREER_FAQ) {
    if (CAREER_FAQ[category].keywords.some(keyword => lowerMessage.includes(keyword))) {
      return CAREER_FAQ[category].response;
    }
  }
  
  // Check if it's about job listings
  if (lowerMessage.includes("job") || lowerMessage.includes("position") || lowerMessage.includes("opening") || 
      lowerMessage.includes("hiring") || lowerMessage.includes("employment")) {
    return `I found some job listings that might interest you. You can view them in the Jobs tab. Based on your interests, I'd recommend checking out the ${JOB_LISTINGS[0].title} position at ${JOB_LISTINGS[0].company}. The role requires skills in ${JOB_LISTINGS[0].skills.join(", ")} and offers ${JOB_LISTINGS[0].salary}.`;
  }
  
  // Check if it's about learning resources
  if (lowerMessage.includes("learn") || lowerMessage.includes("course") || lowerMessage.includes("resource") || 
      lowerMessage.includes("training") || lowerMessage.includes("workshop")) {
    return `I can recommend some learning resources for your professional development. Check out "${CAREER_RESOURCES[0].title}" on ${CAREER_RESOURCES[0].source}. We also have resources about resume building and returning to work after a career break. What specific skills are you looking to develop?`;
  }
  
  // Handle thank you messages
  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    return "You're welcome! I'm glad I could help. Is there anything else you'd like to know about your career journey?";
  }
  
  // For questions about the app/assistant
  if (lowerMessage.includes("what can you do") || lowerMessage.includes("how do you") || 
      lowerMessage.includes("who are you") || lowerMessage.includes("about you")) {
    return "I'm your AI career assistant designed specifically to help with professional development. I can help with resume advice, interview preparation, job searching, networking tips, career transitions, work-life balance, and professional development resources. I have detailed answers for 50 common career questions and can also answer general questions!";
  }
  
  try {
    // Use the external API service for questions not in our database
    return await getAIResponse(message);
  } catch (error) {
    console.error("Error fetching from external API:", error);
    
    // If career-related, give a general response based on interests
    if (isCareerRelated(message) && interests.length > 0) {
      const randomInterest = interests[Math.floor(Math.random() * interests.length)];
      return `Based on your interest in ${randomInterest}, I can help with your question. Many professionals in ${randomInterest} find success through continuous learning and mentorship. Could you provide more specific details about what you'd like to know about careers in ${randomInterest}?`;
    }
    
    // Fallback response
    return "I'd be happy to help with that. Could you provide a bit more detail about what you're looking for? I have information on resume writing, interviewing, salary negotiation, and many other career topics.";
  }
};
