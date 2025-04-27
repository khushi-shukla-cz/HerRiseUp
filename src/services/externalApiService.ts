// This file contains the implementation for connecting to external AI services

// Using environment variables is the most secure approach, but for demo purposes
// we'll use the provided key (in production, this should be managed securely)
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "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";

// OpenRouter endpoint for API calls
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Sends a user message to an external AI service and returns the response
 * @param message The user's message
 * @returns A promise that resolves to the AI's response
 */
export async function getAIResponse(message: string): Promise<string> {
  try {
    // Make the API call to OpenRouter
    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': 'https://herriseup-career-assistant.com', // Use your app's domain
          'X-Title': 'HerRiseUp Career Assistant' // Your app's name
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro-exp-03-25:free", // Using the experimental free tier
          messages: [
            { 
              role: 'system', 
              content: 'You are HerRiseUp, an AI career assistant designed specifically for women. You should provide accurate, helpful, and concise information on any topic, with special expertise in career advice, professional development, job searching, interview preparation, and work-life balance. Always maintain a supportive, encouraging tone. For career-related questions, provide specific, actionable advice. For general knowledge questions on any topic, provide accurate and informative answers. Limit responses to a few paragraphs unless more detail is necessary.' 
            },
            { role: 'user', content: message }
          ],
          max_tokens: 800,
          temperature: 0.7
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error);
        throw new Error(data.error.message || 'Error from external API');
      }
      
      // Extract the response content
      if (data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        return data.choices[0].message.content.trim();
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (apiError) {
      console.error('OpenRouter API error:', apiError);
      // Fall back to simulated responses if the API call fails
      return simulateAIResponse(message);
    }
  } catch (error) {
    console.error('Error in external API call:', error);
    throw new Error('Failed to get response from AI service');
  }
}

/**
 * Simulates AI responses for different topics when a real API is not available
 * This serves as a comprehensive fallback for various question categories
 * @param message The user's message
 * @returns A simulated AI response
 */
function simulateAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Career and professional development
  if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("work") || 
      lowerMessage.includes("professional") || lowerMessage.includes("resume") || lowerMessage.includes("interview")) {
    return "As HerRiseUp, I specialize in career guidance for women. Career development involves continuous learning, networking, mentorship, and strategic planning. What specific aspect of your career journey would you like assistance with? I can provide tailored advice on resume building, interview preparation, career transitions, or professional growth strategies.";
  }
  
  // Technology and STEM questions
  if (lowerMessage.includes("tech") || lowerMessage.includes("technology") || lowerMessage.includes("coding") || 
      lowerMessage.includes("programming") || lowerMessage.includes("stem") || lowerMessage.includes("science")) {
    return "Technology and STEM fields offer exciting opportunities for women. The tech industry continues to evolve with AI, blockchain, quantum computing, and more creating new roles. For women entering STEM, building technical skills, finding mentors, and joining supportive communities can be valuable. Would you like specific information about particular technologies or STEM career paths?";
  }
  
  // Leadership and management
  if (lowerMessage.includes("leadership") || lowerMessage.includes("manage") || lowerMessage.includes("team") || 
      lowerMessage.includes("lead") || lowerMessage.includes("executive") || lowerMessage.includes("director")) {
    return "Effective leadership combines vision, communication, emotional intelligence, and strategic thinking. Women leaders often bring valuable perspectives through inclusive leadership styles. To develop leadership skills, consider seeking stretch assignments, finding mentors, participating in leadership training, and practicing self-advocacy. Would you like more specific leadership development strategies?";
  }
  
  // Work-life balance and wellbeing
  if (lowerMessage.includes("balance") || lowerMessage.includes("stress") || lowerMessage.includes("burnout") || 
      lowerMessage.includes("wellbeing") || lowerMessage.includes("wellness") || lowerMessage.includes("health")) {
    return "Work-life balance is essential for sustainable success. Effective strategies include setting clear boundaries, practicing time management, scheduling self-care, communicating needs, and finding workplaces with supportive cultures. Many women face unique challenges in this area, but creating systems that work for your specific situation is possible. Would you like to discuss specific balance challenges you're facing?";
  }
  
  // Entrepreneurship and business
  if (lowerMessage.includes("startup") || lowerMessage.includes("business") || lowerMessage.includes("entrepreneur") || 
      lowerMessage.includes("founder") || lowerMessage.includes("venture") || lowerMessage.includes("company")) {
    return "Women entrepreneurs are making significant impacts across industries. Building a successful business involves market research, business planning, securing funding, building networks, and developing resilience. Women-focused venture funds, accelerator programs, and entrepreneurial communities can provide valuable support. What specific aspect of entrepreneurship are you interested in?";
  }
  
  // Diversity, inclusion and equality
  if (lowerMessage.includes("diversity") || lowerMessage.includes("inclusion") || lowerMessage.includes("equality") || 
      lowerMessage.includes("gender") || lowerMessage.includes("bias") || lowerMessage.includes("discrimination")) {
    return "Creating diverse and inclusive workplaces benefits everyone. Strategies for advancing equality include data-driven approaches, inclusive policies, addressing unconscious bias, mentorship programs, and leadership accountability. While progress has been made, challenges remain in many sectors. What specific aspect of diversity and inclusion would you like to explore further?";
  }
  
  // Education and learning
  if (lowerMessage.includes("education") || lowerMessage.includes("learn") || lowerMessage.includes("study") || 
      lowerMessage.includes("degree") || lowerMessage.includes("course") || lowerMessage.includes("training")) {
    return "Continuous learning is essential in today's rapidly changing world. Options range from formal education to self-directed learning through online platforms, workshops, certificates, and experiential learning. Women may benefit from programs specifically designed to support their advancement in various fields. What learning goals are you currently focusing on?";
  }
  
  // Financial topics
  if (lowerMessage.includes("finance") || lowerMessage.includes("money") || lowerMessage.includes("invest") || 
      lowerMessage.includes("salary") || lowerMessage.includes("negotiate") || lowerMessage.includes("compensation")) {
    return "Financial empowerment is a crucial aspect of professional success. This includes understanding compensation norms in your industry, developing negotiation skills, creating financial plans, and building investment knowledge. Women sometimes face unique financial challenges, making strategic financial planning particularly important. Would you like more specific financial guidance?";
  }
  
  // Global and cultural perspectives
  if (lowerMessage.includes("global") || lowerMessage.includes("international") || lowerMessage.includes("culture") || 
      lowerMessage.includes("diversity") || lowerMessage.includes("world") || lowerMessage.includes("countries")) {
    return "Global perspectives and cultural intelligence are increasingly valuable in our interconnected world. Understanding how cultural contexts shape workplace norms, communication styles, and leadership approaches can enhance effectiveness in diverse environments. Women's experiences vary significantly across different cultural contexts. What specific aspect of global or cultural diversity would you like to explore?";
  }
  
  // Entertainment and media topics
  if (lowerMessage.includes("movie") || lowerMessage.includes("film") || lowerMessage.includes("show") ||
      lowerMessage.includes("entertainment") || lowerMessage.includes("music") || lowerMessage.includes("art")) {
    return "While I'm primarily designed to help with career-related topics, I can certainly discuss other areas of interest. The arts, entertainment, and creative industries also offer many professional opportunities. Some women find creative pursuits offer valuable balance to their careers. Would you like to explore the professional aspects of creative fields?";
  }
  
  // News and current events
  if (lowerMessage.includes("news") || lowerMessage.includes("current events") || 
      lowerMessage.includes("today") || lowerMessage.includes("recent")) {
    return "I don't have access to real-time news or current events, but I can discuss how ongoing trends might affect career landscapes. Staying informed about industry developments is certainly valuable for professional growth. Is there a specific industry or trend you're interested in discussing from a career perspective?";
  }
  
  // General knowledge topics
  if (lowerMessage.includes("what is") || lowerMessage.includes("how does") || lowerMessage.includes("explain") || 
      lowerMessage.includes("why") || lowerMessage.includes("when") || lowerMessage.includes("who")) {
    return "I can provide information on a wide range of topics beyond career advice. To give you the most helpful response, could you specify what particular aspect of this subject you're most interested in learning about? I'm designed to provide accurate, concise information on virtually any topic you'd like to explore.";
  }
  
  // Default response for other topics
  return "I'm here to help with any questions you have, whether they're related to career development or any other topic. As HerRiseUp, I specialize in supporting women's professional journeys, but I can provide information on a wide range of subjects. Could you share more details about what you'd like to learn?";
} 