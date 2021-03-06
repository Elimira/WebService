import config from '../config';
import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { MongoModule } from '../mongo/mongo.module';
import { PublisherController } from '../publisher/publish.controller';
import { PublisherModule } from '../publisher/publish.module';
import { ConsumerController } from '../consumer/consumer.controller';
import { StoreService } from '../store/store.service';
@Module({
  imports: [
    PublisherModule,
    ConsumerController,
    MongoModule.forRoot(config.mongo),
  ],
  controllers: [AppController, PublisherController],
  providers: [StoreService],
})
export class AppModule {}
