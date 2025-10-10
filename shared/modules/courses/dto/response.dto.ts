import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CourseResponseDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty({ type: String })
  categoryId: Types.ObjectId;

  @ApiProperty({ type: String })
  instructorId: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  introVideoLink?: string;

  @ApiProperty()
  sortOrder?: number;

  @ApiProperty()
  isLocked?: boolean;

  @ApiProperty()
  unlockAfterModule?: string;

  @ApiProperty()
  duration?: string;

  @ApiProperty()
  level?: string;
}
