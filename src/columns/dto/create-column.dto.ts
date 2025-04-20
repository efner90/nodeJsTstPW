import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDto {
  @ApiProperty({ example: 'To Do', description: 'Название колонки' })
  title: string;
}
