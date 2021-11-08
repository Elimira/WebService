import {
  Controller,
  Get,
  Post,
  Logger,
  Body,
  Param,
  UsePipes,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IGetApiResponse } from './interfaces/index';
import { ObjectID } from 'mongodb';
import { CreateDataDto, CustomValidationPipe } from './types/index';
import { ClientProxy } from '@nestjs/microservices';
import { StoreService } from 'src/store/store.service';

@Controller('/api')
@UseInterceptors(ClassSerializerInterceptor)
export class PublisherController {
  logger = new Logger();
  constructor(
    private readonly storeService: StoreService,
    //@Inject('PUBLISH_PAYLOAD') private client: ClientProxy,
  ) {}

  @Post('/payloads')
  @UsePipes(CustomValidationPipe)
  async takeWebData(@Body() createDataDto: CreateDataDto): Promise<boolean> {
    //this.client.emit<number>('user_created', "test test test");
    return await this.storeService.addPayload(createDataDto);
  }  
  @Get('/search')
  async getAllWebData(): Promise<IGetApiResponse> {
    return await this.storeService.getAllPayloads();
  }

  @Get('/search:id')
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'First, you could run the above `Get` request to fetch all payload records, then copy the `_id` field of one of them here (without "").',
    schema: { type: 'string' },
  })
  async getWebData(@Param('id') id: string): Promise<IGetApiResponse> {
    return await this.storeService.getPayloadById(new ObjectID(id));
  }
}
