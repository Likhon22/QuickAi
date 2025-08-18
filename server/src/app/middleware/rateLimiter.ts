import { rateLimit } from 'express-rate-limit';
import config from '../config/index.js';
export const globalRateLimiter = rateLimit({
  windowMs: config.rate_limit_window * 1000,
  limit: config.rate_limit_max,
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: Math.ceil(config.rate_limit_window / 60) + ' minutes',
  },
  legacyHeaders: false,
  standardHeaders: true,
});
