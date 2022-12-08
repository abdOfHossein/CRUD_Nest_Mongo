import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs/swagger/swagger.config';
import { AppModule } from './modules/app/app.module';
const config = require('dotenv').config();
const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 5000;
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  logger.log(
    `Server is running on: ===> ${process.env.HOST}:${process.env.PORT}/api`,
  );
}
bootstrap();
