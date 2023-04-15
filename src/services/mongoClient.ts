import { MongoClient } from 'mongodb';

declare module 'mongodb' {
  interface MongoClientOptions {
    useNewUrlParser?: boolean;
    useUnifiedTopology?: boolean;
  }
}

const uri = process.env.MONGODB_URI as string;
const client: MongoClient = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  if (!(client as any).topology.isConnected()) {
    await client.connect();
  }
  return client.db();
}

export { connectToDatabase };
