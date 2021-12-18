import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await user.verifyPassword(password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(email: string, password: string): Promise<IAccessToken> {
    const user = await this.validateUser(email, password);
    if (user) {
      //generating token payload
      const jwt = this.jwtService.sign({ email: user.email, id: user.id });
      const accessToken : IAccessToken = {
        accessToken : jwt
      }
      return accessToken;
    }
    throw new UnauthorizedException();
  }

  async can(user: User, permission: string[]) {
    let found = false;
    if (!user.role || !user.role.permissions) {
      return false;
    }
    user.role.permissions.toArray()
      .concat(user.permissions)
      .forEach((permissionObject) => {
        if (permission.includes(permissionObject.name)) found = true;
      });
    return found;
  }

  async cant(user: User, permission: string[]) {
    return !this.can(user, permission);
  }
}
