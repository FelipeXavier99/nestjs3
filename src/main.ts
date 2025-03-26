import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3003;
  await app.listen(port);
  app.enableCors(); // Libera acesso externo
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
}
bootstrap();
