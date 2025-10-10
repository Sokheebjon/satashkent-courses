import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateRoleDto } from './create-role.dto';
import { IsMongoId } from 'class-validator';

export class RoleResponse extends CreateRoleDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  _id: Types.ObjectId;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
