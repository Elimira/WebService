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
    const res = await this.apiService.addPayload(updateDataDto);
    this.logger.log(`res is ${res}`);
    this.logger.log(JSON.stringify(res));
    return true;
  }

  @Get('/search')
  async getAllWebData(): Promise<IGetApiResponse> {
    try {
      return await this.apiService.getAllPayloads();
    } catch (error) {
      this.logger.log(error);
      return { status: 404, res: [] };
    }
  }

  @Get('/search:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'First, you could run the above `Get` request to fetch all payload records, then copy `id` field of one of them here.',
    schema: { type: 'string' },
  })
  async getWebData(@Param('id') Id: number): Promise<IGetApiResponse> {
    try {
      return await this.apiService.getPayloadById(new ObjectID(Id));
    } catch (error) {
      this.logger.log(error);
      return { status: 404, res: [] };
    }
  }
}
