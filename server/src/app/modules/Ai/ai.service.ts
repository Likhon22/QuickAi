import { clerkClient } from '@clerk/express';
import DatabaseConfig from '../../config/database.js';
import {
  generateContent,
  generateImage,
  sendImageToCloudinary,
} from './ai.utils.js';

const generateAIResponse = async (
  prompt: string,
  length: number,
  userId: string,
  free_usage: number,
  plan: 'premium' | 'free',
) => {
  const db = DatabaseConfig.getInstance().getConnection();
  const response = await generateContent(prompt, length);
  await db`INSERT INTO creations (user_id,prompt, content,type) VALUES (${userId}, ${prompt}, ${response}, 'article')`;
  if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }
  return response;
};
const generateBlogResponse = async (
  prompt: string,

  userId: string,
  free_usage: number,
  plan: 'premium' | 'free',
) => {
  const db = DatabaseConfig.getInstance().getConnection();
  const response = await generateContent(prompt, 100);
  await db`INSERT INTO creations (user_id,prompt, content,type) VALUES (${userId}, ${prompt}, ${response}, 'article')`;
  if (plan !== 'premium') {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: free_usage + 1,
      },
    });
  }
  return response;
};

const generateImageResponse = async (
  prompt: string,
  userId: string,
  publish: boolean,
) => {
  const db = DatabaseConfig.getInstance().getConnection();
  const response = await generateImage(prompt);
  const imageUrl = await sendImageToCloudinary(response);
  await db`INSERT INTO creations (user_id,prompt, content,type,publish) VALUES (${userId}, ${prompt}, ${imageUrl}, 'image',${publish ?? false})`;
};
const aiServices = {
  generateAIResponse,
  generateBlogResponse,
  generateImageResponse,
};

export default aiServices;
