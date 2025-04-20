import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Card } from 'src/cards/entities/card.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isDone: boolean;

  @ManyToOne(() => Card, card => card.tasks, { onDelete: 'CASCADE' })
  card: Card;
}
