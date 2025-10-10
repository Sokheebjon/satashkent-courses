import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class UserResponseDto extends CreateUserDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  _id: Types.ObjectId;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
