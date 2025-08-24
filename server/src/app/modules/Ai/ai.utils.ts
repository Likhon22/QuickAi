/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import openai from './ai.constant.js';
import config from '../../config/index.js';

export const generateContent = async (prompt: string, length: number) => {
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

export const generateImage = async (prompt: string) => {
  const formdata = new FormData();
  formdata.append('prompt', prompt);
  await axios.post('https://clipdrop-api.co/cleanup/v1', formdata, {
    headers: {
      'x-api-key': config.clipDrop_api_key,
    },
    responseType: 'arraybuffer',
  });
};
