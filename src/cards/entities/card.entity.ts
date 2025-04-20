import { Entity, PrimaryGeneratedColumn, Column as DBColumn, ManyToOne } from 'typeorm';
import { Column as TrelloColumn } from 'src/columns/entities/column.entity';

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
}
