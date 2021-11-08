import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const user =
    configService.get('RABBITMQ_USER') || config.microserviceOptions.user;
  const password =
    configService.get('RABBITMQ_PASSWORD') ||
    config.microserviceOptions.password;
  const host =
    configService.get('RABBITMQ_HOST') || config.microserviceOptions.host;
  const queueName =
    configService.get('RABBITMQ_QUEUE_NAME') ||
    config.microserviceOptions.queueName;

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: queueName,
      queueOptions: {
        durable: true,
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
