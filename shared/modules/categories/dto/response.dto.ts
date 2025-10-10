import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CategoryResponseDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ type: String })
  parentId?: Types.ObjectId;

  @ApiProperty()
  icon?: string;

  @ApiProperty()
  isActive?: boolean;
}
