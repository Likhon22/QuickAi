import { db } from '../../config/database.js';

const getUserCreationsFromDB = async (userId: string) => {
  const creations =
    await db`SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`;
  return creations;
};

const getPublishedCreationsFromDB = async () => {
  const creations =
    await db`SELECT * FROM creations WHERE publish=true ORDER BY created_at DESC`;
  return creations;
};
const updateCreationsLikes = async (creationId: number, userId: string) => {
  const [creation] = await db`SELECT * FROM creations WHERE id=${creationId}`;
  if (!creation) {
    throw new Error('Creation not found');
  }
  let updatedLikes: string[] = [];
  let message: string = '';
  const likes: string[] = creation.likes || [];
  if (likes.includes(userId)) {
    updatedLikes = likes.filter(user => user !== userId);
    message = 'Creation unliked successfully';
  } else {
    updatedLikes = [...likes, userId];
    message = 'Creation liked successfully';
  }
  await db`UPDATE creations SET likes=${updatedLikes} ::text[] WHERE id=${creationId}`;
  return message;
};
const userServices = {
  getUserCreationsFromDB,
  getPublishedCreationsFromDB,
  updateCreationsLikes,
};

export default userServices;
