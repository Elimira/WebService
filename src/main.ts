import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule }   from './app/app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log("config is ")
  console.log(config)
  const document = SwaggerModule.createDocument(app, config.openAPIObject);
  SwaggerModule.setup('api', app, document);
  await app.listen(config.app.port);
}
bootstrap();