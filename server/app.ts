import express, { Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from './schemas/index';

import axios from 'axios';

dotenv.config();
mongoose.set('strictQuery', false);

const connectUrl = process.env.CONNECT_URL;
if (connectUrl) (async () => await mongoose.connect(connectUrl))();
const router = express.Router();

const app = express();
const port = 3001;

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());

app.post(
  '/users/:userId/batch-jobs/:batchJobIndex/enable',
  async (req, res) => {
    const { userId, batchJobIndex } = req.params;
    const { enabled } = req.body;
    try {
      const user = await UserModel.findById(userId);
      user.batchJobs[batchJobIndex].enabled = enabled;
      await user.save();
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

async function executeBatchJobs() {
  const users = await UserModel.find({});
  users.forEach(async (user) => {
    const enabledBatchJobs = user.batchJobs.filter(
      (batchJob) => batchJob.enabled
    );
    enabledBatchJobs.forEach(async (batchJob) => {
      try {
        const result = await axios.post('http://localhost:3001/query', {
          query: batchJob.query,
        });
        console.log(
          `Batch job result for user ${user.name}, job name ${batchJob.name}:`,
          result.data
        );
      } catch (error) {
        console.error(
          `Error executing batch job for user ${user.name}, job name ${batchJob.name}:`,
          error.message
        );
      }
    });
  });
}

cron.schedule('0 0 * * *', executeBatchJobs);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default router;