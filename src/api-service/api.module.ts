import config from '../config';
import { Module } from '@nestjs/common';
import {
  Transport,
  ClientsModule,
  ClientProxyFactory,
} from '@nestjs/microservices';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ApiController],
  providers: [
    ApiService,
    {
      provide: 'MATH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const queueName = configService.get('RABBITMQ_QUEUE_NAME');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiModule {}
