/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  rate_limit_max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  rate_limit_window: parseInt(process.env.RATE_LIMIT_WINDOW || '600', 10),
};
