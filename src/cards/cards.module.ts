import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Column } from 'src/columns/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Column])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
