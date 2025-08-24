import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest.js';
import aiValidations from './ai.validation.js';
import aiControllers from './ai.controller.js';

const routes = Router();

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

export const AiRoutes = routes;
