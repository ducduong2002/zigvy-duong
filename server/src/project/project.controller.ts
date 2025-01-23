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
import { ProjectService } from './project.service';
import { Project } from './project.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() project: Project) {
    return this.projectService.createProject(project);
  }

  @Get(':userId')
  async getProjectsByUserId(
    @Param('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
    @Query() query: ExpressQuery,
  ) {
    console.log(page, limit, 'line 31');
    return this.projectService.findProjectByUserId(userId, page, limit, query);
  }

  @Put(':_id')
  async updateProjectByUserId(
    @Param('_id') _id: string,
    @Body() projectData: Partial<Project>,
  ) {
    return this.projectService.updateProjectByUserId(_id, projectData);
  }

  @Delete(':_id')
  async deleteProjectByUserId(@Param('_id') _id: string) {
    return this.projectService.deleteProjectByUserId(_id);
  }
}
