import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import userServices from './user.services.js';

const getUserCreations = catchAsync(async (req, res) => {
  const { userId } = await req.auth();
  if (!userId) {
    throw new Error('User not authenticated');
  }
  const creations = await userServices.getUserCreationsFromDB(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User creations fetched successfully',
    data: creations,
  });
});

const getPublishedCreations = catchAsync(async (req, res) => {
  const creations = await userServices.getPublishedCreationsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User creations fetched successfully',
    data: creations,
  });
});
const updateCreationLikes = catchAsync(async (req, res) => {
  const { creationId } = req.body as { creationId: number };
  const { userId } = await req.auth();
  if (!userId) {
    throw new Error('User not authenticated');
  }
  if (!creationId) {
    throw new Error('Creation ID is required');
  }
  const message = await userServices.updateCreationsLikes(creationId, userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message,
    data: null,
  });
});
const userController = {
  getUserCreations,
  getPublishedCreations,
  updateCreationLikes,
};
export default userController;
