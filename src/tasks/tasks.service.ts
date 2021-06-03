import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from 'tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'tasks/dto/get-tasks-filter.dto';
import { Prisma, Task, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async getTasksWithFilter(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;

    return this.prisma.task.findMany({
      where: {
        userId: user.id,
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

  async getTaskById(id: number, user: User): Promise<Task> {
    try {
      return await this.prisma.task.findUnique({
        where: { id_userId: { id, userId: user.id } },
      });
    } catch (err) {
      throw new NotFoundException(`task with ID:${id} not found!`);
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    try {
      return this.prisma.task.create({
        data: { ...createTaskDto, userId: user.id },
      });
    } catch (err) {
      throw new BadRequestException('cannot create the task');
    }
  }

  async deleteTask(id: number, user: User): Promise<Task> {
    try {
      return await this.prisma.task.delete({
        where: { id_userId: { id, userId: user.id } },
      });
    } catch (err) {
      throw new NotFoundException(`task with ID:${id} not found!`);
    }
  }

  async updateTask(
    id: number,
    data: Prisma.TaskUpdateInput,
    user: User,
  ): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: { id_userId: { id, userId: user.id } },
        data,
      });
    } catch (err) {
      throw new NotFoundException(`task with ID:${id} update error`);
    }
  }
}
