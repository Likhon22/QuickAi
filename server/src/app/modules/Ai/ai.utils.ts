/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import openai from './ai.constant.js';
import config from '../../config/index.js';
import connectCloudinary from '../../config/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';
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
  try {
    const formdata = new FormData();
    formdata.append('prompt', prompt);
    const { data } = await axios.post(
      'https://clipdrop-api.co/cleanup/v1',
      formdata,
      {
        headers: {
          'x-api-key': config.clipDrop_api_key,
        },
        responseType: 'arraybuffer',
      },
    );
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
    return base64Image;
  } catch (err: any) {
    throw new Error('Image generation failed', err);
  }
};

export const sendImageToCloudinary = async (base64Image: string) => {
  try {
    await connectCloudinary();
    const { secure_url } = await cloudinary.uploader.upload(base64Image, {
      folder: 'quickAi_generated',
      quality: 'auto:good',
      fetch_format: 'auto',
      transformation: [
        {
          quality: 'auto',
        },
        { fetch_format: 'auto' },
      ],
    });
    return secure_url;
  } catch (err: any) {
    throw new Error('Image upload to Cloudinary failed', err);
  }
};
