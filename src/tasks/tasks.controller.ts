import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cards/:cardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('cardId') cardId: string, @Body('title') title: string) {
    return this.tasksService.create(title, +cardId);
  }

  @Get()
  findAll(@Param('cardId') cardId: string) {
    return this.tasksService.findAll(+cardId);
  }
}
