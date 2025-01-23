import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  Project: string;

  @Prop({ required: true })
  Name: string;

  @Prop({ required: true })
  Owner: string;

  @Prop({ default: Date.now })
  Date: Date;

  @Prop({ required: true })
  userId: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
