import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { Logger } from "nestjs-pino";
import cookieParser from "cookie-parser";
import { BaseErrorFilter } from "@shared/filters";


async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService);    

  const config = new DocumentBuilder()
    .setTitle('User API docs')
    .setDescription('Satashkent user apis')
    .setVersion('1.0')
    .addServer(configService.getOrThrow('USER_APP_URL'))
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

  const PORT = 4000;
  await app.listen(PORT);
}
bootstrap();