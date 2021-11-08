import config from '../config';
import { Module } from '@nestjs/common';
import { AppController } from '../app/app.controller';
import { MongoModule } from '../mongo/mongo.module';
import { ApiController } from '../api-service/api.controller';
import { ApiService } from '../api-service/api.service';
import { ApiModule } from 'src/api-service/api.module';
@Module({
  imports: [ApiModule, MongoModule.forRoot(config.mongo)],
  controllers: [AppController, ApiController],
  providers: [ApiService],
})
export class AppModule {}
