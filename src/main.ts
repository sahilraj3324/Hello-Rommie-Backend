import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { setupMongoListeners } from './Database/mongo.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Hello Rommie API')
    .setDescription('API documentation for Hello Rommie - Roommate Finder App')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'User authentication endpoints')
    .addTag('profiles', 'User profile management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  setupMongoListeners();

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
