import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('Документация Trello-like API')
    .setVersion('1.0')
    .addBearerAuth() // чтобы можно было вставлять JWT токен
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // <-- путь по которому будет доступна документация

  await app.listen(3000);
}
bootstrap();

