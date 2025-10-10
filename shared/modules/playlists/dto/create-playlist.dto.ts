import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreatePlaylistDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  courseId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  lessonIds?: Types.ObjectId[];
}
