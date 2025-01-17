import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async findTasksByUserId(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).exec();
  }

  async updateTaskByUserId(
    _id: string,
    taskData: Partial<Task>,
  ): Promise<Task> {
    return this.taskModel.findOneAndUpdate({ _id }, taskData, { new: true });
  }

  async deleteTaskByUserId(_id: string): Promise<{ deletedCount?: number }> {
    return this.taskModel.deleteOne({ _id }).exec();
  }
}
