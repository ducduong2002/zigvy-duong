import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Hoặc bạn có thể sử dụng một mảng nếu có nhiều origin
    methods: 'GET,POST,PUT,DELETE', // Các phương thức HTTP được phép
    allowedHeaders: 'Content-Type,Authorization', // Các header được phép
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
