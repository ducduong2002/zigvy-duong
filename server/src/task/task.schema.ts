// src/task/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'task', timestamps: true })
export class Task extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  status: string;

  @Prop({ required: true, enum: ['low', 'medium', 'high'], default: 'medium' })
  priority: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Foreign key linked to the User table
  userId: Types.ObjectId;

  @Prop({ required: true })
  createDate: Date; // Chuyển từ string sang Date
}

export const TaskSchema = SchemaFactory.createForClass(Task);
