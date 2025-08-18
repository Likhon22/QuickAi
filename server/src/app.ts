import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import cors from 'cors';
import { globalRateLimiter } from './app/middleware/rateLimiter.js';
import { applySecurity } from './app/middleware/security.js';

export const app: Application = express();

//applying security middleware
applySecurity(app);

// Enable CORS
app.use(cors());
// Enable JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limiter middleware
app.use(globalRateLimiter);

const test = (req: Request, res: Response) => {
  res.send('server is running');
};
app.get('/', test);
