import { Column as ColumnEntity } from 'src/columns/entities/column.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ColumnEntity, column => column.user)
  columns: ColumnEntity[];
  
}
