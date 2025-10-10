import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class AuthDto {
    @ApiProperty({ required: true })
    @IsString()
    login: string;
  
    @ApiProperty({ required: true })
    @IsString()
    password: string;
}