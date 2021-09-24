import { Controller, Post, UseGuards, Request, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post()
    @HttpCode(200)
    async login(@Body('email') email : string, @Body('password') password : string){
        return this.authService.login(email, password)
    }
}
