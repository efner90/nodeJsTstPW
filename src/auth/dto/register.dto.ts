import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpassword123', description: 'Пароль (минимум 6 символов)' })
  @IsString()
  @MinLength(6)
  password: string;
}