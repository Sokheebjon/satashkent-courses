import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class AuthDto {
    @ApiProperty({ required: true })
    @IsString()
    login: string;
  
    @ApiProperty({ required: true })
    @IsString()
    password: string;
}

export class RegisterDto {
    @ApiProperty({ required: true })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsString()
    login: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty({ required: true })
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty({ required: true })
    @IsString()
    password: string;
}