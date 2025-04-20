import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private columnRepo: Repository<Column>,
  ) {}

  create(title: string, user: any) {
    const column = this.columnRepo.create({
      title,
      user: { id: user.userId }, 
    });
    return this.columnRepo.save(column);
  }

  findAll(userId: number) {
    return this.columnRepo.find({ where: { user: { id: userId } } });
  }

  async remove(id: number, userId: number) {
    const column = await this.columnRepo.findOne({ where: { id }, relations: ['user'] });
    if (!column || column.user.id !== userId) {
      throw new NotFoundException('Колонка не найдена или доступ запрещён');
    }
    return this.columnRepo.remove(column);
  }
}
