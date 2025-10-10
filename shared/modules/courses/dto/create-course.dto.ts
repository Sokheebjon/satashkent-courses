import { IsBoolean, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateCourseDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  categoryId: Types.ObjectId;

  @ApiProperty({ type: String })
  @IsMongoId()
  instructorId: Types.ObjectId;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  introVideoLink?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isLocked?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  unlockAfterModule?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  duration?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  level?: string;
}
