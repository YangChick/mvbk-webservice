import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.setGlobalPrefix('api');
  await app.listen(3001);
  app.enableCors();
}
bootstrap();
