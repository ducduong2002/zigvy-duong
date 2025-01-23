import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: Task) {
    return this.taskService.createTask(task);
  }

  @Get('all')
  async getTasksAll() {
    return this.taskService.findTaskAll();
  }

  @Get(':userId')
  async getTasksByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
    @Query() query: ExpressQuery,
    @Query('status') status: string,
    @Query('priority') priority: string,
  ) {
    console.log(page, limit, 'line 36');
    return this.taskService.findTasksByUserId(
      userId,
      page,
      limit,
      query,
      status,
      priority,
    );
  }

  @Put(':_id')
  async updateTaskByUserId(
    @Param('_id') _id: string,
    @Body() taskData: Partial<Task>,
  ) {
    return this.taskService.updateTaskByUserId(_id, taskData);
  }

  @Delete(':_id')
  async deleteTaskByUserId(@Param('_id') _id: string) {
    return this.taskService.deleteTaskByUserId(_id);
  }
}
