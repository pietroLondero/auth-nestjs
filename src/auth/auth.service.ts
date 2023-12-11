import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from 'src/dto/tokens.dto';
import { RefreshTokenDto } from 'src/dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {

  }

  async signup(body: AuthDto): Promise<TokensDto> {
    const hashedPassword = await this.hashPassword(body.password);
    body.password = hashedPassword;
    const user = await this.userRepository.save(body);

    return await this.getTokens(user.id, user.email);
  }

  async signin(body: AuthDto): Promise<TokensDto> {
    const user = await this.userRepository.findOne({ where: { email: body.email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    return await this.getTokens(user.id, user.email);
  }

  async logout() {
    return 'logout';
  }

  async refresh(body: RefreshTokenDto, userId: number): Promise<TokensDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    return await this.getTokens(user.id, user.email);
  }

  private async hashPassword(password: string, rounds = process.env.SALT_ROUNDS || 10): Promise<string> {
    return await bcrypt.hash(password, rounds);
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync({
      userId,
      email
    }, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || 3600,
      secret: process.env.AT_SECRET_JWT || "secret"
    });

    const refreshToken = await this.jwtService.signAsync({
      userId,
      email
    }, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || 3600,
      secret: process.env.AT_SECRET_JWT || "secret-2"
    });

    return {
      accessToken,
      refreshToken
    }
  }
}
