import { Controller, Get, Post, Logger, Body, Param, UsePipes } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IGetApiResponse } from './interfaces/index';
//import { ObjectID } from 'mongodb';
//import { ApiService } from './api.service';
import { UpdateDataDto, CustomValidationPipe } from './types/index';


@Controller('/api')
export class ApiController {
  logger = new Logger();
  // constructor(private readonly treeService: TreeService) {}

  @Get('/search:id')
  @ApiParam({name: 'id', required: true, description: 'Record Id', schema: {type: 'integer'}})
  async getData(@Param('id') dataId: number): Promise<IGetApiResponse> {
    try {
      return {
        status: 200,
        res: [
          {
            ts: '1530228282',
            sender: 'testy-test-service',
            message: {
              foo: 'bar',
              baz: 'bang',
            },
            sentFromIp: '1.2.3.4',
            priority: 2,
          },
        ],
      };
      //return await this.treeService.findDescenders(new ObjectID(nodeId));
    } catch (error) {
      this.logger.log(error);
      return { status: 404, res: [] };
    }
  }

  @Post('/update')
  @UsePipes(CustomValidationPipe)
  async takeData(@Body() updateDataDto: UpdateDataDto): Promise<boolean> {
    return true;
    // return await this.treeService.updateNode(
    //   new ObjectID(srcNode),
    //   new ObjectID(tarNode),
    // );
  }
}