import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, isNotEmpty, isString } from "class-validator";

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @ApiProperty()
  password: string;
}