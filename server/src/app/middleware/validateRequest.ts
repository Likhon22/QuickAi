import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod/v3';
import catchAsync from '../utils/catchAsync.js';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    schema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export default validateRequest;
