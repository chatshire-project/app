import mongoose from 'mongoose';

export interface BatchJobType {
  name: string;
  query: string;
  enabled: boolean;
}

export interface UserType {
  name: string;
  email: string;
  batchJobs: BatchJobType[];
}

const batchJobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  query: { type: String, required: true },
  enabled: { type: Boolean, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  batchJobs: { type: [batchJobSchema], default: [] },
});

export const UserModel = mongoose.model('Job', userSchema);
