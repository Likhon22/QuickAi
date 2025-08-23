import OpenAI from 'openai';
import config from '../../config/index.js';

const openai = new OpenAI({
  apiKey: config.gemini_api_key,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

export default openai;
