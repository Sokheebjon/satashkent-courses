import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class PlaylistResponseDto {
  @ApiProperty({ type: String })
  _id: Types.ObjectId;

  @ApiProperty({ type: String })
  courseId: Types.ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [String] })
  lessonIds?: Types.ObjectId[];
}
