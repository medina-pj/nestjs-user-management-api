import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe()); //{ whitelist: true }

  // swagger config
  const config = new DocumentBuilder()
    .setTitle('User Management App Api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      operationsSorter: 'method',
    },
  });

  await app.listen(3000);
}

bootstrap();
