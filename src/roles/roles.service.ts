import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from 'src/dto/role.dto';
import { User } from 'src/entities';
import { Role } from 'src/entities/Role.entity';
import { In, Repository } from 'typeorm';
import { PaginationService } from '@pietro/common';
import { GenericFilterDto } from '@pietro/common';


@Injectable()
export class RolesService extends PaginationService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async addRole(role: RoleDto): Promise<RoleDto> {
    const existingRole = await this.roleRepository.findOne({
      where: [{ name: role.name }, { code: role.code }],
    });

    if (existingRole) {
      throw new HttpException('Role already exist', HttpStatus.BAD_REQUEST);
    }
    return await this.roleRepository.save(role);
  }

  async getRoles(filter: GenericFilterDto): Promise<any> {
    const where = this.createWhereQuery(filter);
    return await this.paginate(this.roleRepository, filter, where);
  }

  async getRole(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async updateRole(id: number, role: RoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ where: { id } });
    if (!existingRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    await this.roleRepository.update(id, role);
    return await this.roleRepository.findOne({ where: { id } });
  }

  async deleteRole(id: number): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ where: { id } });
    if (!existingRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }
    await this.roleRepository.delete(id);
    return existingRole;
  }

  // async getUsers(id: number): Promise<User[]> {
  //   const existingRole = await this.roleRepository.findOne({
  //     where: { id: id }
  //   });

  //   if (!existingRole) {
  //     throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  //   }
  //   const users = await this.userRepository.find({
  //     where: {
  //       roles: {
  //         id: id
  //       }
  //     }
  //   });

  //   return users;
  // }

  // async assignUsers(id: number, userIds: number[]): Promise<User[]> {
  //   const existingRole = await this.roleRepository.findOne({ where: { id } });
  //   console.log('existingRole', existingRole)
  //   if (!existingRole) {
  //     throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
  //   }
  //   const users = await this.userRepository.find({ where: { id: In(userIds) } });
  //   if (!users || users.length !== userIds.length) {
  //     throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
  //   }

  //   users.forEach(user => {
  //     user.roles.push(existingRole);
  //   })

  //   return await this.userRepository.save(users);
  // }

  // async assignRoles(userId: number, roleIds: number[]): Promise<Role[]> {
  //   const existingUser = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
  //   if (!existingUser) {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  //   const roles = await this.roleRepository.find({ where: { id: In(roleIds) } });
  //   if (!roles || roles.length !== roleIds.length) {
  //     throw new HttpException('Roles not found', HttpStatus.NOT_FOUND);
  //   }

  //   existingUser.roles = roles;

  //   await this.userRepository.save(existingUser);

  //   return roles;
  // }
}
