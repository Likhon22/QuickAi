/* eslint-disable @typescript-eslint/no-explicit-any */

import openai from './ai.constant.js';

const generateContent = async (prompt: string, length: number) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });
    return response.choices[0]?.message?.content;
  } catch (error: any) {
    throw new Error('AI generation failed', error);
  }
};

export default generateContent;
