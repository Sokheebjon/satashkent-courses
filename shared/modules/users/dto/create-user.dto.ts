import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ type: String })
  @IsMongoId()
  @IsOptional()
  roleId?: Types.ObjectId;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
