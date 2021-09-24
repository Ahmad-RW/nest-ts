import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AccessToken } from './resources/accessToken.resource';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

    async validateUser(email : string, password : string): Promise<User> {
        const user = await this.userService.getUserByEmail(email)
        if (user && (await user.verifyPassword(password))) {
            return user
        }
        throw new UnauthorizedException();
    }


    async login(email: string, password: string): Promise<AccessToken> {
        const user = await this.validateUser(email, password)
        if (user) {
            //generating token payload
            const jwt = this.jwtService.sign({email : user.email, id : user.id})
            const accessToken = new AccessToken(jwt)
            return accessToken
        }
        throw new UnauthorizedException()
    }

}
