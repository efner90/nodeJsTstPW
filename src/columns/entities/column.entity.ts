import { Entity, PrimaryGeneratedColumn, Column as Col, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @Col()
  title: string;

  @ManyToOne(() => User, user => user.columns, { onDelete: 'CASCADE' })
  user: User;
}
