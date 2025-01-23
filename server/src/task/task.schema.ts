import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  task: string;

  @Prop({ required: true, enum: ['Pending', 'In Progress', 'Completed'] }) // Giá trị cho status
  status: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true, enum: ['Low', 'Medium', 'High'] }) // Giá trị cho priority
  priority: string;

  @Prop({ required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
