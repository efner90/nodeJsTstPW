import { Entity, PrimaryGeneratedColumn, Column as DBColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @DBColumn()
  title: string;

  @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
  user: User;
  
  @OneToMany(() => Card, card => card.column)
    cards: Card[];
}
