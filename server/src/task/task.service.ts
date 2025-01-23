import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { Query } from 'express-serve-static-core';
@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }
  async findTaskAll(): Promise<Task[]> {
    return this.taskModel.find({}).exec();
  }

  async findTasksByUserId(
    userId: string,
    page: number,
    limit: number,
    query: Query,
    status: string,
    priority: string,
  ) {
    const skip = (page - 1) * limit;

    const keyword = query.keyword
      ? {
          task: { $regex: query.keyword, $options: 'i' },
        }
      : {};
    const filter = {
      ...(status && { status }),
      ...(priority && { priority }),
    };
    const tasks = await this.taskModel
      .find({ userId, ...keyword, ...filter })
      .skip(skip)
      .limit(limit);

    const totalTasks = await this.taskModel.countDocuments({ userId });

    return {
      tasks,
      totalTasks,
      page,
      limit,
      totalPages: Math.ceil(totalTasks / limit),
    };
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
