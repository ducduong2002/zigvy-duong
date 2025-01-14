import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
  task: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export interface Task extends Document {
  id: string;
  task: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  date: Date;
}
