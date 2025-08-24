import { v2 as cloudinary } from 'cloudinary';
import config from './index.js';

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: config.cloudinary.cloud_name as string,
      api_key: config.cloudinary.api_key as string,
      api_secret: config.cloudinary.api_secret as string,
    });
  } catch (err) {
    console.error('Cloudinary configuration error:', err);
    throw new Error('Failed to configure Cloudinary');
  }
};

export default connectCloudinary;
