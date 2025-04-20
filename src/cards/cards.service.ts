import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { Column } from 'src/columns/entities/column.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardRepo: Repository<Card>,
    @InjectRepository(Column) private columnRepo: Repository<Column>,
  ) {}

  async create(title: string, description: string, columnId: number, userId: number) {
    const column = await this.columnRepo.findOne({ where: { id: columnId }, relations: ['user'] });

    if (!column || column.user.id !== userId) {
      throw new NotFoundException('Колонка не найдена или не принадлежит пользователю');
    }

    const card = this.cardRepo.create({ title, description, column });
    return this.cardRepo.save(card);
  }

  async findAll(columnId: number, userId: number) {
    const column = await this.columnRepo.findOne({ where: { id: columnId }, relations: ['user'] });

    if (!column || column.user.id !== userId) {
      throw new NotFoundException('Колонка не найдена или не принадлежит пользователю');
    }

    return this.cardRepo.find({ where: { column: { id: columnId } } });
  }

  async remove(id: number, userId: number) {
    const card = await this.cardRepo.findOne({ where: { id }, relations: ['column', 'column.user'] });

    if (!card || card.column.user.id !== userId) {
      throw new NotFoundException('Карточка не найдена или доступ запрещён');
    }

    return this.cardRepo.remove(card);
  }
}
