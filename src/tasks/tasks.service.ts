import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Card } from 'src/cards/entities/card.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    @InjectRepository(Card)
    private cardRepo: Repository<Card>,
  ) {}

  async create(title: string, cardId: number) {
    const card = await this.cardRepo.findOne({ where: { id: cardId } });
    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }

    const task = this.taskRepo.create({ title, card });
    return this.taskRepo.save(task);
  }

  findAll(cardId: number) {
    return this.taskRepo.find({ where: { card: { id: cardId } } });
  }
}
