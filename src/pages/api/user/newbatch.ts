import { connectToDatabase } from '@services/mongoClient';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export interface BatchType {
  sql: string;
}

async function addBatch(walletAddress: string, batch: BatchType) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  // Find the user and get the current batchList
  const user = await usersCollection.findOne({ walletAddress });
  const currentBatchList = user?.batchList || [];
  const newBatchList = [...currentBatchList, batch];

  // Update the user's batchList
  const result = await usersCollection.updateOne(
    { walletAddress },
    { $set: { batchList: newBatchList } }
  );

  return result;
}

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.patch(async (req, res) => {
  const { walletAddress, sql } = req.body;
  const batch = {
    sql,
  };
  const result = await addBatch(walletAddress, batch);
  res.status(201).json(result);
});

export default handler;
