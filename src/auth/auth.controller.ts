import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough : true}) res : Response
  ) : Promise<IAccessToken> {
    const accessToken = await this.authService.login(email, password);
    res.cookie('jwt', accessToken.accessToken, {httpOnly : true})
    return accessToken
  }

  @Post('/logout')
  @HttpCode(200)
  logout( @Res({passthrough : true}) res : Response) : void{
    res.clearCookie('jwt')
    return
  }
}
