import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  user: boolean;

  @ApiProperty()
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty()
  @IsBoolean()
  userCreate: boolean;

  @ApiProperty()
  @IsBoolean()
  userUpdate: boolean;

  @ApiProperty()
  @IsBoolean()
  userDelete: boolean;

  @ApiProperty()
  @IsBoolean()
  practice: boolean;

  @ApiProperty()
  @IsBoolean()
  practiceAll: boolean;

  @ApiProperty()
  @IsBoolean()
  practiceCreate: boolean;

  @ApiProperty()
  @IsBoolean()
  practiceUpdate: boolean;

  @ApiProperty()
  @IsBoolean()
  practiceDelete: boolean;

  @ApiProperty()
  @IsBoolean()
  practiceResult: boolean;

  @ApiProperty()
  @IsBoolean()
  group: boolean;

  @ApiProperty()
  @IsBoolean()
  groupCreate: boolean;

  @ApiProperty()
  @IsBoolean()
  groupUpdate: boolean;

  @ApiProperty()
  @IsBoolean()
  groupDelete: boolean;

  @ApiProperty()
  @IsBoolean()
  course: boolean;

  @ApiProperty()
  @IsBoolean()
  courseCreate: boolean;

  @ApiProperty()
  @IsBoolean()
  courseUpdate: boolean;

  @ApiProperty()
  @IsBoolean()
  courseDelete: boolean;

  @ApiProperty()
  @IsBoolean()
  admin: boolean;

  @ApiProperty()
  @IsBoolean()
  adminCreate: boolean;

  @ApiProperty()
  @IsBoolean()
  adminUpdate: boolean;

  @ApiProperty()
  @IsBoolean()
  adminDelete: boolean;

  @ApiProperty()
  @IsBoolean()
  role: boolean;
}
