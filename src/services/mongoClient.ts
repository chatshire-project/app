import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '@constants/config';

declare module 'mongodb' {
  interface MongoClientOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  }
}

const uri = MONGODB_URI as string;
const client: MongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  await client.connect();
  return client.db();
}

export { connectToDatabase };
