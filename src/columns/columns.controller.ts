import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body('title') title: string, @Req() req) {
    return this.columnsService.create(title, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.columnsService.findAll(req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.columnsService.remove(+id, req.user.userId);
  }
}
