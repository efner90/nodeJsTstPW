import { Controller, Post, Body, UseGuards, Req, Get, Delete, Param } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateColumnDto } from './dto/create-column.dto';

@ApiTags('Колонки')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать колонку' })
  @ApiBody({ type: CreateColumnDto })
  create(@Body() body: CreateColumnDto, @Req() req) {
    return this.columnsService.create(body.title, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все колонки' })
  findAll(@Req() req) {
    return this.columnsService.findAll(req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить колонку' })
  @ApiParam({ name: 'id', type: Number, description: 'ID колонки' })
  remove(@Param('id') id: string, @Req() req) {
    return this.columnsService.remove(+id, req.user.userId);
  }
}
