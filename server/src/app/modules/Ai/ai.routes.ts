import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest.js';
import aiValidations from './ai.validation.js';
import aiControllers from './ai.controller.js';
import auth from '../../middleware/auth.js';
import { upload } from '../../config/multer.js';

const routes = Router();

routes.use(auth);
routes.post(
  '/generate-article',
  validateRequest(aiValidations.articleValidationSchema),
  aiControllers.generateArticle,
);
routes.post(
  '/generate-blog',
  validateRequest(aiValidations.blogValidationSchema),
  aiControllers.generateBlog,
);
routes.post(
  '/generate-image',
  validateRequest(aiValidations.textToImageValidationSchema),
  aiControllers.generateImage,
);
routes.post(
  '/remove-background',
  upload.single('image'),
  aiControllers.removeBackground,
);
routes.post(
  '/remove-object',
  upload.single('image'),
  aiControllers.removeObject,
);
routes.post(
  '/resume-review',
  upload.single('resume'),
  aiControllers.resumeReview,
);
export const AiRoutes = routes;
