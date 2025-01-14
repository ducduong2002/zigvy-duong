import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/create-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const userId = req.user._id; // Lấy userId từ token
    return this.taskService.createTask(createTaskDto, userId);
  }

  @Get()
  async getAllTasks(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('query') query: string,
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const searchQuery = query || '';
    return this.taskService.getAllTasks(pageNum, limitNum, searchQuery);
  }

  @Get('userId')
  async getTasksByUser(
    @Req() req,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('query') query: string,
  ) {
    const userId = req.user.userId;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const searchQuery = query || '.';
    return this.taskService.getTasksByUser(
      userId,
      pageNum,
      limitNum,
      searchQuery,
    );
  }

  @Put(':taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
