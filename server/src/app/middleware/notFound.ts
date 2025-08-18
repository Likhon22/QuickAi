import type { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const errorResponse = {
    statusCode: 404,
    message: 'API is not found',
    errorSources: [{ path: req.originalUrl, message: 'API is not found' }],
  };
  res.status(errorResponse.statusCode).json({
    errorResponse,
  });
};

export default notFound;
