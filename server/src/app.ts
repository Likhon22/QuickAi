import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import { globalRateLimiter } from './app/middleware/rateLimiter.js';
import { applySecurity } from './app/middleware/security.js';
import { morganMiddleware } from './app/middleware/logger.js';
import globalErrorHandler from './app/middleware/globalErrorHandler.js';
import notFound from './app/middleware/notFound.js';
import config from './app/config/index.js';

export const app: Application = express();

//applying security middleware
applySecurity(app);

// logger
app.use(morganMiddleware);
// Enable CORS
app.use(
  cors({
    origin: [config.cors_origin as string],
  }),
);
// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limiter middleware
app.use(globalRateLimiter);

// Test route to check if server is running
const test = (req: Request, res: Response) => {
  res.send('server is running');
};
app.get('/', test);

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);
