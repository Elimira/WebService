import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], //TODO: read from config file  TODO: Dockerfile rabbitmq-server 2- rabbitmq-plugins enable rabbitmq_management 3- http://localhost:15672/
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config.openAPIObject);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservices();
  await app.listen(config.app.port);
}
bootstrap();
