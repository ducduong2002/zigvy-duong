import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(project: Project): Promise<Project> {
    const newProject = new this.projectModel(project);
    return newProject.save();
  }

  async findProjectByUserId(
    userId: string,
    page: number,
    limit: number,
    query: Query,
  ) {
    const skip = (page - 1) * limit;

    const keyword = query.keyword
      ? {
          $or: [
            { Project: { $regex: query.keyword, $options: 'i' } },
            { Name: { $regex: query.keyword, $options: 'i' } },
            { Owner: { $regex: query.keyword, $options: 'i' } },
          ],
        }
      : {};
    const projects = await this.projectModel
      .find({ userId, ...keyword })
      .skip(skip)
      .limit(limit);

    const totalProjects = await this.projectModel.countDocuments({ userId });

    return {
      projects,
      totalProjects,
      page,
      limit,
      totalPages: Math.ceil(totalProjects / limit),
    };
  }
  async updateProjectByUserId(
    _id: string,
    projectData: Partial<Project>,
  ): Promise<Project> {
    return this.projectModel.findOneAndUpdate({ _id }, projectData, {
      new: true,
    });
  }

  async deleteProjectByUserId(_id: string): Promise<{ deletedCount?: number }> {
    return this.projectModel.deleteOne({ _id }).exec();
  }
}
