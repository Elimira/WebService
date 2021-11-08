import {
  Controller,
  Get,
  Post,
  Logger,
  Body,
  Param,
  UsePipes,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IGetApiResponse } from './interfaces/index';
import { ObjectID } from 'mongodb';
import { ApiService } from './api.service';
import { UpdateDataDto, CustomValidationPipe } from './types/index';

@Controller('/api')
export class ApiController {
  logger = new Logger();
  constructor(private readonly apiService: ApiService) {}

  @Post('/payloads')
  @UsePipes(CustomValidationPipe)
  async takeWebData(@Body() updateDataDto: UpdateDataDto): Promise<boolean> {
    return await this.apiService.addPayload(updateDataDto);
  }

  @Get('/search')
  async getAllWebData(): Promise<IGetApiResponse> {
    return await this.apiService.getAllPayloads();
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
    return await this.apiService.getPayloadById(new ObjectID(id));
  }
}
