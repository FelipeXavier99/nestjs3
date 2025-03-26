// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não declarados nos DTOs
      forbidNonWhitelisted: true, // Rejeita requisições com campos extras
      transform: true, // Converte tipos automaticamente (ex: string -> number)
    }),
  );
  await app.listen(3003);
}
bootstrap();







