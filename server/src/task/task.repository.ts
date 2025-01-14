import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task } from './task.schema';

import { CreateTaskDto, UpdateTaskDto } from 'src/dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, createDate, userId } = createTaskDto;
    const newTask = new this.taskModel({
      title,
      createDate,
      userId, // Chuyển đổi userId sang ObjectId
    });

    return newTask.save();
  }

  async findAll(
    page: number,
    limit: number,
    query: string,
  ): Promise<{ tasks: Task[]; total: number }> {
    const filter = query
      ? {
          $or: [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') },
          ],
        }
      : {};

    const tasks = await this.taskModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.taskModel.countDocuments(filter).exec();

    return { tasks, total };
  }

  async findById(taskId: string): Promise<Task | null> {
    return this.taskModel.findById(taskId).exec();
  }

  async findByUserId(
    userId: string,
    page: number,
    limit: number,
    query: string,
  ): Promise<{ tasks: Task[]; total: number }> {
    const filter = query
      ? {
          userId,
          $or: [
            { title: new RegExp(query, 'i') },
            { description: new RegExp(query, 'i') },
          ],
        }
      : { userId };

    const tasks = await this.taskModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.taskModel.countDocuments(filter).exec();

    return { tasks, total };
  }

  async updateById(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    // Convert userId if it exists in the DTO
    if (updateTaskDto.userId) {
      updateTaskDto.userId = new Types.ObjectId(updateTaskDto.userId);
    }

    return this.taskModel
      .findByIdAndUpdate(taskId, updateTaskDto, { new: true })
      .exec();
  }

  async deleteById(taskId: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(taskId).exec();
  }
  async findByCreateDate(createDate: Date): Promise<Task[]> {
    return this.taskModel.find({ createDate }).exec();
  }
}
