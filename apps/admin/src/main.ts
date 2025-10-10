import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AdminAppModule } from './admin.module';
import { BaseErrorFilter } from '@shared/filters';

async function bootstrap() {
  const app = await NestFactory.create(AdminAppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Admin API docs')
    .setDescription('Satashkent admin apis')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    .addServer('https://admin.educon.uz', 'Development environment')
    .addBearerAuth({
      description: 'JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new BaseErrorFilter());
  app.useLogger(app.get(Logger));
  app.use(cookieParser());

  const PORT = 3000;
  await app.listen(PORT);
}
bootstrap();
