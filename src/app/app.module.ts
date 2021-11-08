import config from '../config';
import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { MongoModule } from '../mongo/mongo.module';
import { PublisherController } from '../publisher/publish.controller';
import { PublisherService } from '../publisher/publish.service';
import { PublisherModule } from 'src/publisher/publish.module';
import { ConsumerController } from 'src/consumer/consumer.controller';
@Module({
  imports: [PublisherModule, ConsumerController,  MongoModule.forRoot(config.mongo)],
  controllers: [AppController, PublisherController],
  providers: [PublisherService],
})
export class AppModule {}
