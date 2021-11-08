import config from '../config';
import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { MongoModule } from '../mongo/mongo.module';
import { ApiController } from '../publisher-service/publish.controller';
import { ApiService } from '../publisher-service/publish.service';
import { ApiModule } from 'src/publisher-service/publish.module';
@Module({
  imports: [ApiModule, MongoModule.forRoot(config.mongo)],
  controllers: [AppController, ApiController],
  providers: [ApiService],
})
export class AppModule {}
