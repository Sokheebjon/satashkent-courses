import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ParamDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  id: string;
}
