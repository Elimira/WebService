import { IMongoModuleOptions } from './mongo/index';
import { DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

const appKey = process.env.APP_KEY || 'some-random-string';
const serverAddress = process.env.SERVER_ADDRESS || 'http://localhost:3333';

const config: IConfig = {
  app: {
    port: process.env.PORT || 3333,
    url: serverAddress,
    key: appKey,
  },
  mongo: {
    name: process.env.MONGO_DB_NAME || 'Project',
    host: process.env.MONGO_HOST || 'localhost:27017',
  },
  openAPIObject: new DocumentBuilder()
    .setTitle('Assignment')
    .setDescription('The Web Service API descriptions')
    .setVersion('1.0')
    .addTag('Unity ♥')
    .build(),
};

export default config;
interface IConfig {
  app: any;
  mongo: IMongoModuleOptions;
  openAPIObject: any;
}
