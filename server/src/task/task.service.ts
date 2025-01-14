import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto, UpdateTaskDto } from '../dto/create-task.dto';
import { Task } from './task.schema';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    return this.taskRepository.create({ ...createTaskDto, userId });
  }

  async getAllTasks(
    page: number,
    limit: number,
    query: string,
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.taskRepository.findAll(page, limit, query);
  }

  async getTasksByUser(
    userId: string,
    page: number,
    limit: number,
    query: string,
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.taskRepository.findByUserId(userId, page, limit, query);
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | null> {
    return this.taskRepository.updateById(taskId, updateTaskDto);
  }

  async deleteTask(taskId: string): Promise<Task | null> {
    return this.taskRepository.deleteById(taskId);
  }
}
