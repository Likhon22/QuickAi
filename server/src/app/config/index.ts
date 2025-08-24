/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV || 'development',
  cors_origin: process.env.CORS_ORIGIN,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  rate_limit_max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  rate_limit_window: parseInt(process.env.RATE_LIMIT_WINDOW || '600', 10),
  clerk: {
    clerk_publishable_key: process.env.CLERK_PUBLISHABLE_KEY,
    clerk_secret_key: process.env.CLERK_SECRET_KEY,
  },
  gemini_api_key: process.env.GEMINI_API_KEY,
  clipDrop_api_key: process.env.CLIPDROP_API_KEY,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
