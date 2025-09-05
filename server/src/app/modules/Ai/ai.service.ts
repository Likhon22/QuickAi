import { clerkClient } from '@clerk/express';
import { db } from '../../config/database.js';
import {
  generateContent,
  generateImage,
  sendImageToCloudinary,
} from './ai.utils.js';
import { PDFExtract } from 'pdf.js-extract';
import fs from 'fs';
import type { Express } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import connectCloudinary from '../../config/cloudinary.js';
import { resumePrompt } from './ai.constant.js';
const generateAIResponse = async (
  prompt: string,
  length: number,
  userId: string,
  free_usage: number,
  plan: 'premium' | 'free',
) => {
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
  const response = await generateImage(prompt);
  const imageUrl = await sendImageToCloudinary(response);
  await db`INSERT INTO creations (user_id,prompt, content,type,publish) VALUES (${userId}, ${prompt}, ${imageUrl}, 'image',${publish ?? false})`;
  return imageUrl;
};
const removeBackgroundImageResponse = async (
  image: Express.Multer.File,
  userId: string,
) => {
  await connectCloudinary();
  if (!image) {
    throw new Error('No image file provided');
  }

  if (!image.path) {
    throw new Error('Image file path is missing');
  }

  const { secure_url } = await cloudinary.uploader.upload(image.path, {
    transformation: [
      {
        effect: 'background_removal',
        background_removal: 'remove_the_background',
      },
    ],
  });
  await db`INSERT INTO creations (user_id,prompt, content,type) VALUES (${userId}, 'remove background from image', ${secure_url}, 'image')`;
  return secure_url;
};
const removeObjectFromImage = async (
  image: Express.Multer.File,
  userId: string,
  object: string,
) => {
  await connectCloudinary();
  if (!image) {
    throw new Error('No image file provided');
  }

  if (!image.path) {
    throw new Error('Image file path is missing');
  }
  const { public_id } = await cloudinary.uploader.upload(image.path);
  const image_url = cloudinary.url(public_id, {
    transformation: [
      {
        effect: `gen_remove:${object}`,
      },
    ],
    resource_type: 'image',
  });
  console.log(image_url);

  await db`INSERT INTO creations (user_id,prompt, content,type) VALUES (${userId}, ${`remove ${object} from image`}, ${image_url}, 'image')`;
  return image_url;
};
const resumeReviewResponse = async (
  resume: Express.Multer.File,
  userId: string,
) => {
  if (!resume) {
    throw new Error('No image file provided');
  }

  if (!resume.path) {
    throw new Error('Image file path is missing');
  }
  if (!resume.mimetype.includes('pdf')) {
    throw new Error('Only PDF files are supported for resume review');
  }

  const pdfExtract = new PDFExtract();
  const pdfData = await pdfExtract.extract(resume.path, {});
  const extractedText = pdfData?.pages?.map(page =>
    page.content.map(item => item.str).join(' '),
  );

  const prompt = `${resumePrompt} resume content:${extractedText}`;

  const response = await generateContent(prompt, 500);
  await db`INSERT INTO creations (user_id,prompt, content,type) VALUES (${userId}, ${resumePrompt}, ${response}, 'image')`;
  // clean up uploaded file
  fs.unlinkSync(resume.path);
  return response;
};

const aiServices = {
  generateAIResponse,
  generateBlogResponse,
  generateImageResponse,
  removeBackgroundImageResponse,
  removeObjectFromImage,
  resumeReviewResponse,
};

export default aiServices;
