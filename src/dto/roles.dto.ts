import { BaseResponseDto } from "@pietro/common";
import { RoleDto } from "./role.dto";
import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class RolesDto extends BaseResponseDto {
  @Expose()
  @ApiProperty()
  @Type(() => RoleDto)
  roles: RoleDto[];
}