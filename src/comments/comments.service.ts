import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Card } from 'src/cards/entities/card.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Card) private cardRepo: Repository<Card>,
  ) {}

  async create(text: string, cardId: number, userPayload: { userId: number }) {
    const card = await this.cardRepo.findOne({
      where: { id: cardId },
      relations: ['column', 'column.user'],
    });
  
    if (!card || card.column.user.id !== userPayload.userId) {
      throw new NotFoundException('Карточка не найдена или не принадлежит пользователю');
    }
  
    const user = { id: userPayload.userId } as User; 
  
    const comment = this.commentRepo.create({ text, card, user });
    return this.commentRepo.save(comment);
  }

  findAll(cardId: number) {
    return this.commentRepo.find({ where: { card: { id: cardId } }, relations: ['user'] });
  }

  async remove(id: number, userId: number) {
    const comment = await this.commentRepo.findOne({ where: { id }, relations: ['user'] });
    if (!comment || comment.user.id !== userId) {
      throw new NotFoundException('Комментарий не найден или не ваш');
    }
    return this.commentRepo.remove(comment);
  }
}
