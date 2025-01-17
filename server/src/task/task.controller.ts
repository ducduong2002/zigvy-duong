import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: Task) {
    return this.taskService.createTask(task);
  }

  @Get(':userId')
  async getTasksByUserId(@Param('userId') userId: string) {
    return this.taskService.findTasksByUserId(userId);
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
