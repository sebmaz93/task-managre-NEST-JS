import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from 'tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'tasks/dto/get-tasks-filter.dto';
// import { Task, TaskStatus } from 'tasks/task.model';
import { Prisma, Task, User } from '@prisma/client';

import { TasksService } from 'tasks/tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'auth/get-user.decorator';
// import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto, user);
    }
    return this.tasksService.getAllTasks(user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    /** Update only Status with customm pipe validation */
    // @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @Body() data: Prisma.TaskUpdateInput,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, data, user);
  }

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(
  //   /** METHOD 1 */
  //   // @Body() body
  //   /** METHOD 2 */
  //   // @Body('title') title: string,
  //   // @Body('description') description: string,
  //   /** WITH DTO */
  //   @Body() createTaskDto: CreateTaskDto,
  // ): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id')
  // updateTask(
  //   @Param('id') id: string,
  //   /** Update only Status with customm pipe validation */
  //   // @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  //   @Body() createTaskDto: CreateTaskDto,
  // ): Task {
  //   return this.tasksService.updateTask(id, createTaskDto);
  // }
}
