import { Entity, PrimaryGeneratedColumn, Column as DBColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @DBColumn()
  @ApiProperty()
  text: string;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => User })
  user: User;

  @ManyToOne(() => Card, card => card.comments, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Card })
  card: Card;
}
