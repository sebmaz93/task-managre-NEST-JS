import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'tasks/dto/get-tasks-filter.dto';
// import { Task, TaskStatus } from 'tasks/task.model';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}
  private tasks: Task[] = [
    { id: 123, title: 'perma', description: 'perma', status: 'IN_PROGRESS' },
  ];

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTasksWithFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    // const { status, search } = filterDto;

    // let tasks = this.getAllTasks();

    // if (status) {
    //   tasks = tasks.filter((task) => task.status === status);
    // }

    // if (search) {
    //   tasks = tasks.filter(
    //     (task) =>
    //       task.title.includes(search) || task.description.includes(search),
    //   );
    // }

    return this.tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });

    if (!task) {
      throw new NotFoundException(`task with ID: ${id} not found!`);
    }

    return task;
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async deleteTask(id: string): Promise<void> {
    // const task = this.getTaskById(id);
    // this.tasks = this.tasks.filter((_task) => _task.id !== task.id);
  }

  async updateTask(
    id: string,
    { id: _, ...data }: Partial<Task>,
  ): Promise<Task> {
    // const task = this.getTaskById(id);
    // const updatedTask = { ...task, ...data };
    // this.deleteTask(id);
    // this.tasks.push(updatedTask);
    // return updatedTask;
    return this.tasks[0];
  }

  // private tasks: Task[] = [];
  //
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  //
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`task with ID: ${id} not found!`);
  //   }
  //   return task;
  // }
  //
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((_task) => _task.id !== task.id);
  // }
  //
  // updateTask(id: string, { id: _, ...data }: Partial<Task>): Task {
  //   const task = this.getTaskById(id);
  //   const updatedTask = { ...task, ...data };
  //   this.deleteTask(id);
  //   this.tasks.push(updatedTask);
  //   return updatedTask;
  // }
}
