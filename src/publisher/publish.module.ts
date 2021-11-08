import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PublisherController } from './publish.controller';
import { StoreService } from 'src/store/store.service';
 
@Module({
  imports: [ConfigModule],
  controllers: [PublisherController],
  providers: [
    StoreService,
    {
      provide: 'PUBLISH_PAYLOAD',
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
        })
      },
      inject: [ConfigService],
    }
  ],
})
export class PublisherModule {}