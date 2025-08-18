import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import config from '../config/index.js';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources = [
    {
      path: req.originalUrl,
      message: message,
    },
  ];
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
