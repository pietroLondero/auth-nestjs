import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class RefreshTokenDto {
  @Expose()
  @ApiProperty()
  refreshToken: string;
}