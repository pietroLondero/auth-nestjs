import { Controller, Post, Body, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from 'src/dto/role.dto';
import { Role } from 'src/entities/Role.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities';
import { GenericFilterDto } from '@pietro/common';
import { Serialize } from '@pietro/common';
import { RolesDto } from 'src/dto/roles.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) { }

  @Serialize(RoleDto)
  @ApiResponse({
    status: 200,
    description: 'Add role',
    type: RoleDto
  })
  @Post()
  async addRole(@Body() role: RoleDto): Promise<RoleDto> {
    return await this.rolesService.addRole(role);
  }

  @Serialize(RoleDto)
  @ApiResponse({
    status: 200,
    description: 'Get roles',
    type: RolesDto
  })
  @Get()
  async getRoles(@Query() filter: GenericFilterDto): Promise<RolesDto[]> {
    return await this.rolesService.getRoles(filter);
  }

  @Serialize(RoleDto)
  @ApiResponse({
    status: 200,
    description: 'Get role',
    type: RoleDto
  })
  @Get(':id')
  async getRole(@Param() id: number): Promise<RoleDto> {
    return await this.rolesService.getRole(id);
  }

  @Serialize(RoleDto)
  @ApiResponse({
    status: 200,
    description: 'Update role',
    type: RoleDto
  })
  @Put(':id')
  async updateRole(@Param() id: number, @Body() role: RoleDto): Promise<Role> {
    return await this.rolesService.updateRole(id, role);
  }

  @Serialize(RoleDto)
  @ApiResponse({
    status: 200,
    description: 'Delete role',
    type: RoleDto
  })
  @Delete(':id')
  async deleteRole(@Param() id: number): Promise<Role> {
    return await this.rolesService.deleteRole(id);
  }

  // @Get(':id/users')
  // async getUsers(@Param('id') id: number): Promise<User[]> {
  //   return await this.rolesService.getUsers(id);
  // }
}

