import { connectToDatabase } from '@services/mongoClient';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { BatchType } from './newbatch';

interface UserType {
  walletAddress: string;
  batchList: BatchType[];
}

async function addUser(user: UserType) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  // Check if user exists
  const existingUser = await usersCollection.findOne({
    walletAddress: user.walletAddress,
  });
  if (existingUser) {
    return existingUser;
  }

  // Add user to the database
  const result = await usersCollection.insertOne(user);
  return result;
}

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { walletAddress } = req.body;
  const user = {
    walletAddress,
    batchList: [],
  };
  const result = await addUser(user);
  res.status(201).json(result);
});

export default handler;
