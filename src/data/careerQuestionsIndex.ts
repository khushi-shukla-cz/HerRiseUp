import { careerQuestions1To10 } from './careerQuestions1-10';
import { careerQuestions11To20 } from './careerQuestions11-20';
import { careerQuestions21To30 } from './careerQuestions21-30';
import { careerQuestions31To40 } from './careerQuestions31-40';
import { careerQuestions41To50 } from './careerQuestions41-50';

// Combine all question sets into a single array
export const allCareerQuestions = [
  ...careerQuestions1To10,
  ...careerQuestions11To20,
  ...careerQuestions21To30,
  ...careerQuestions31To40,
  ...careerQuestions41To50
];

// Function to find an answer by question text
export const findAnswerByQuestion = (questionText: string) => {
  const question = allCareerQuestions.find(
    q => q.question.toLowerCase() === questionText.toLowerCase()
  );
  return question ? question.answer : null;
};

// Export individual sets for more targeted use
export {
  careerQuestions1To10,
  careerQuestions11To20,
  careerQuestions21To30,
  careerQuestions31To40,
  careerQuestions41To50
}; 