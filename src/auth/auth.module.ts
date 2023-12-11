import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { RtStrategy, AtStrategy } from '../strategies';
import { JwtModule } from '@nestjs/jwt';
import { Group, Role } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Role]), JwtModule.register({})],
  providers: [AuthService, AtStrategy, RtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
