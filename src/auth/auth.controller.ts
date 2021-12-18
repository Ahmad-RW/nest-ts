import { Controller, Post, Body, HttpCode, Request } from '@nestjs/common';
import { Request as reqType } from 'express';
import { AuthService } from './auth.service';
import { Permission } from './entities/permission.entity';
import { Permissions } from './enums/permission.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ) : Promise<IAccessToken> {
    return this.authService.login(email, password);
  }
}
