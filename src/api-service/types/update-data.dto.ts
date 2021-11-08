import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsIP,
  IsDefined,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class Message {
  @IsOptional()
  @ApiProperty()
  @IsString()
  foo: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  baz: string;
}

export class UpdateDataDto {
  @ApiProperty()
  @IsNotEmpty()
  ts: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty({ type: () => Message })
  @IsDefined()
  @ValidateNested()
  @Type(() => Message)
  message: Message;

  @ApiProperty()
  @IsOptional()
  @IsIP()
  send_from_ip: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  priority: number;
}
