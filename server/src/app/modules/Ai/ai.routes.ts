import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest.js';
import aiValidations from './ai.validation.js';
import aiControllers from './ai.controller.js';

const routes = Router();

routes.post(
  '/ai-response',
  validateRequest(aiValidations.aiValidationSchema),
  aiControllers.generateArticle,
);

export const AiRoutes = routes;
