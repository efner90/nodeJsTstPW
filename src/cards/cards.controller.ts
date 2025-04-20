import { Controller, Post, Get, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('columnId') columnId: number,
    @Req() req,
  ) {
    return this.cardsService.create(title, description, columnId, req.user.userId);
  }

  @Get(':columnId')
  findAll(@Param('columnId') columnId: number, @Req() req) {
    return this.cardsService.findAll(columnId, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.cardsService.remove(id, req.user.userId);
  }
}
