import { Entity, PrimaryGeneratedColumn, Column as DBColumn, ManyToOne, OneToMany } from 'typeorm';
import { Column as TrelloColumn } from 'src/columns/entities/column.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @DBColumn()
  title: string;

  @DBColumn({ nullable: true })
  description?: string;

  @ManyToOne(() => TrelloColumn, column => column.cards, { onDelete: 'CASCADE' })
  column: TrelloColumn;

  @OneToMany(() => Task, task => task.card, { cascade: true })
    tasks: Task[];
}
