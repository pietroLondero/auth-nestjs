import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth.dto';
import { Tokens } from '../types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokensDto } from 'src/dto/tokens.dto';
import { RefreshTokenDto } from 'src/dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) { }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: 200,
    description: 'Sign up',
    type: TokensDto
  })
  @Post('local/signup')
  async signup(@Body() body: AuthDto): Promise<TokensDto> {
    return this.AuthService.signup(body);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: TokensDto
  })
  @Post('local/signin')
  async signin(@Body() body: AuthDto): Promise<TokensDto> {
    return this.AuthService.signin(body);
  }

  @Post('local/logout')
  async logout() {
    this.AuthService.logout();
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Refresh token',
    type: TokensDto
  })
  @UseGuards(AuthGuard('jwt-refresh-token'))
  @Post('local/refresh')
  async refresh(userId: number, @Body() body: RefreshTokenDto): Promise<TokensDto> {
    return this.AuthService.refresh(body, userId);
  }
}

