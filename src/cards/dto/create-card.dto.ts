import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 'Сделать проект', description: 'Название карточки' })
  title: string;

  @ApiProperty({ example: 'Описание задачи', description: 'Описание карточки', required: false })
  description?: string;

  @ApiProperty({ example: 1, description: 'ID колонки, в которую добавить карточку' })
  columnId: number;
}
