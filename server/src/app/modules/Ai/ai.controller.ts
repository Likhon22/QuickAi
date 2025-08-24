import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import aiServices from './ai.service.js';

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
    message: 'Blog generated successfully',
    data: response,
  });
});

const aiControllers = {
  generateArticle,
  generateBlog,
  generateImage,
};

export default aiControllers;
