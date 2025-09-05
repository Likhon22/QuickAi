import { Router } from 'express';
import userController from './user.controller.js';

const router = Router();

router.post('/creations', userController.getUserCreations);
router.get('/creations/published', userController.getPublishedCreations);
router.post('/creations/like', userController.updateCreationLikes);
export const UserRoutes = router;
