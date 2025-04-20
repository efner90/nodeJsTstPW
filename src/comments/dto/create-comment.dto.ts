import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Это мой комментарий', description: 'Текст комментария' })
  @IsString()
  @MinLength(1)
  text: string;

  @ApiProperty({ example: 5, description: 'ID карточки, к которой относится комментарий' })
  @IsNumber()
  cardId: number;
}
