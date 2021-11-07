import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsNotEmpty,
  IsDateString,
  IsIP,
  IsDefined,
  IsString, 
  IsNumber,
  ValidateNested
} from 'class-validator';

class Message {
  @ApiProperty()
  @IsString()
  foo: string;

  @ApiProperty()
  @IsString()
  baz: string;
}

export class UpdateDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  ts: string;  // 2020-02-08T0 20200208

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
  send_from_ip: string;  //684D:1111:222:3333:4444:5555:6:77  //19.117.63.126
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  priority: number;
}
