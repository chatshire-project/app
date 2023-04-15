import { connectToDatabase } from '@services/mongoClient';
import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export interface BatchType {
  sql: string;
}

async function getBatch() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  const users = await usersCollection.find({});

  return users;
}

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const result = await getBatch();
  res.status(201).json(result);
});

export default handler;
