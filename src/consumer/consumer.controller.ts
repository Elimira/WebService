import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateDataDto } from '../publisher/types/index';

@Controller()
export class ConsumerController {
  constructor() {}
  logger = new Logger();

  @EventPattern('PUBLISH_PAYLOAD')
  async ConsumePayload(data: CreateDataDto) {}
}
