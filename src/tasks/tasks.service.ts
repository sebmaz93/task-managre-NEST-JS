import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'tasks/dto/get-tasks-filter.dto';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    return this.prisma.task.findMany({
      where: {
        AND: {
          status,
          OR: [
            {
              title: { contains: search },
            },
            {
              description: { contains: search },
            },
          ],
        },
      },
    });
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`task with ID:${id} not found!`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data: createTaskDto });
  }

  async deleteTask(id: number): Promise<Task> {
    try {
      return await this.prisma.task.delete({ where: { id } });
    } catch (err) {
      throw new NotFoundException(`task with ID:${id} not found!`);
    }
  }

  async updateTask(id: number, data: Prisma.TaskUpdateInput): Promise<Task> {
    try {
      return await this.prisma.task.update({ where: { id }, data });
    } catch (err) {
      throw new NotFoundException(`task with ID:${id} update error`);
    }
  }
}
