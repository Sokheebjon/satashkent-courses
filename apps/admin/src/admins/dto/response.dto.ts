import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class AdminResponseDto extends CreateAdminDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  _id: Types.ObjectId;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
