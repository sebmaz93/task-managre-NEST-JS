import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'tasks/task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value) {
    value = value.toUpperCase();

    if (this.isStatusValid(value)) {
      throw new BadRequestException(`this value ${value} is invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return !!this.allowedStatuses.includes(status);
  }
}
