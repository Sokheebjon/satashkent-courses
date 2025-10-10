import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class LessonResponseDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ type: String })
  playlistId: Types.ObjectId;
}
