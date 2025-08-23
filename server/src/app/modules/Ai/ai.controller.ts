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
  const response = await aiServices.generateAIResponse(prompt, length);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'AI content generated successfully',
    data: response,
  });
});

const aiControllers = {
  generateArticle,
};

export default aiControllers;
