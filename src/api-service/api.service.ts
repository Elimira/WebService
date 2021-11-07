//import indexList from './mongoIndexes';
import { Db, ObjectID, MongoClient } from 'mongodb';
import { IndexDB, InjectConnection, InjectClient } from '../mongo/index';
import { Injectable, Logger } from '@nestjs/common';
import { UpdateDataDto } from './types/index';
import { IGetApiResponse } from './interfaces';

@Injectable()
export class ApiService {
  logger = new Logger();
  constructor(
    @InjectConnection() private readonly mongoConnection: Db,
    @InjectClient() private readonly mongoClient: MongoClient,
  ) {}

  //@IndexDB("tree", indexList)
  async addPayload({
    ts,
    sender,
    message,
    send_from_ip,
    priority,
  }: UpdateDataDto): Promise<any> {
    this.logger.log('payload is going to be add');
    const res = await this.mongoConnection.collection('data').insertOne({
      ts: ts,
      sender: sender,
      message: message,
      send_from_ip: send_from_ip,
      priority: priority,
    });
    return res.ops[0];
  }

  async getAllPayloads(): Promise<IGetApiResponse> {
    try {
      const payloads = await this.mongoConnection
        .collection('data')
        .find({})
        .sort({ priority: 1 })
        .toArray();
      return { status: 200, res: payloads };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getPayloadById(id: ObjectID): Promise<IGetApiResponse> {
    try {
      const payload = await this.mongoConnection
        .collection('data')
        .findOne({_id: id})
      return { status: 200, res: [payload] };
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error: string) {
    this.logger.error(error);
    switch (error) {
      case 'Error: Invalid input data':
        return { status: 400, res: [] };
      default:
        return { status: 503, res: [] };
    }
  }
}
