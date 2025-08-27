import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import aiServices from './ai.service.js';

import type { Express } from 'express';
const generateArticle = catchAsync(async (req, res) => {
  const { userId } = await req.auth();
  const { prompt, length } = req.body;
  const plan = req.plan;
  const free_usage = req.free_usage || 0;
  if (plan !== 'premium' && free_usage >= 10) {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message:
        'Free usage limit reached. Upgrade to premium for more requests.',
      data: null,
    });
  }
  const response = await aiServices.generateAIResponse(
    prompt,
    length,
    userId,
    free_usage,
    plan ?? 'free',
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'AI content generated successfully',
    data: response,
  });
});
const generateBlog = catchAsync(async (req, res) => {
  const { userId } = await req.auth();
  const { prompt } = req.body;
  const plan = req.plan;
  const free_usage = req.free_usage || 0;
  if (plan !== 'premium' && free_usage >= 10) {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message:
        'Free usage limit reached. Upgrade to premium for more requests.',
      data: null,
    });
  }
  const response = await aiServices.generateBlogResponse(
    prompt,

    userId,
    free_usage,
    plan ?? 'free',
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog generated successfully',
    data: response,
  });
});
const generateImage = catchAsync(async (req, res) => {
  const { userId } = await req.auth();
  const { prompt, publish } = req.body;
  const plan = req.plan;

  console.log(plan, prompt, userId, publish);

  if (plan !== 'premium') {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message:
        'Image generation is available for premium users only. Please upgrade your plan.',
      data: null,
    });
  }
  const response = await aiServices.generateImageResponse(
    prompt,

    userId,
    publish,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Image generated successfully',
    data: response,
  });
});
const removeBackground = catchAsync(async (req, res) => {
  const { userId } = await req.auth();
  const image = req.file as Express.Multer.File;
  const plan = req.plan;

  if (plan !== 'premium') {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message:
        'Image generation is available for premium users only. Please upgrade your plan.',
      data: null,
    });
  }
  const response = await aiServices.removeBackgroundImageResponse(
    image,
    userId,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Background removed successfully',
    data: response,
  });
});
const removeObject = catchAsync(async (req, res) => {
  const { userId } = await req.auth();
  const image = req.file as Express.Multer.File;
  const plan = req.plan;
  const object = req.body?.object;

  if (plan !== 'premium') {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message:
        'Image generation is available for premium users only. Please upgrade your plan.',
      data: null,
    });
  }
  const response = await aiServices.removeObjectFromImage(
    image,
    userId,
    object,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Background removed successfully',
    data: response,
  });
});

const resumeReview = catchAsync(async (req, res) => {
  const { userId } = await req.auth();

  const plan = req.plan;
  const resume = req.file as Express.Multer.File;
  if (plan !== 'premium') {
    return sendResponse(res, {
      statusCode: 403,
      success: false,
      message:
        'Image generation is available for premium users only. Please upgrade your plan.',
      data: null,
    });
  }

  if (resume.size > 5 * 1024 * 1024) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'File size exceeds the 5MB limit.',
      data: null,
    });
  }
  

  const response = await aiServices.resumeReviewResponse(resume, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Background removed successfully',
    data: response,
  });
});

const aiControllers = {
  generateArticle,
  generateBlog,
  generateImage,
  removeBackground,
  removeObject,
  resumeReview,
};

export default aiControllers;
