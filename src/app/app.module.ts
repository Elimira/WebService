import config              from '../config';
import { Module }         from '@nestjs/common';
import { AppController }  from '../app/app.controller';
import { MongoModule }    from '../mongo/mongo.module';
import { ApiController }  from '../api-service/api.controller';
import { ApiService }     from '../api-service/api.service';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [    
     MongoModule.forRoot(config.mongo),
     ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController, ApiController],
  providers  : [ApiService],
})
export class AppModule { }
