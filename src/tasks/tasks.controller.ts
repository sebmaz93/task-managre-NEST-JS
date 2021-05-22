import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from 'tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'tasks/dto/get-tasks-filter.dto';
// import { Task, TaskStatus } from 'tasks/task.model';

import { TasksService } from 'tasks/tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

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
