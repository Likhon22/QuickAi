import generateContent from './ai.utils.js';

const generateAIResponse = async (prompt: string, length: number) => {
  const response = await generateContent(prompt, length);
  return response;
};

const aiServices = {
  generateAIResponse,
};

export default aiServices;
