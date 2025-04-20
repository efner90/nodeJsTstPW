import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateCardDto } from './dto/create-card.dto';

@ApiTags('Карточка пользователя')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать карту' })
  @ApiBody({ type: CreateCardDto })
  create(@Body() body: CreateCardDto, @Req() req) {
    return this.cardsService.create(
      body.title,
      body.description ?? '', 
      body.columnId,
      req.user.userId
    );
  }

  @Get(':columnId')
  @ApiOperation({ summary: 'Получить карту пользователя' })
  @ApiParam({ name: 'columnId', type: Number, description: 'ID колонки' })
  findAll(@Param('columnId') columnId: number, @Req() req) {
    return this.cardsService.findAll(columnId, req.user.userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить карту' })
  @ApiParam({ name: 'id', type: Number, description: 'ID карточки' })
  remove(@Param('id') id: number, @Req() req) {
    return this.cardsService.remove(id, req.user.userId);
  }
}
