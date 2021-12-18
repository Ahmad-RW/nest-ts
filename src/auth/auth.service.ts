import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Permission, Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client'
import { UsersService } from '../users/users.service';
import { RoleId } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await this.userService.verifyPassword(user, password))) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(email: string, password: string): Promise<IAccessToken> {
    const user = await this.validateUser(email, password);
    if (user) {
      //generating token payload
      const jwt = this.jwtService.sign({ email: user.email, id: user.id });
      const accessToken: IAccessToken = {
        accessToken: jwt
      }
      return accessToken;
    }
    throw new UnauthorizedException();
  }

  async can(user: User & {
    role: Role & {
      permissions: Permission[]
    },
  }, permission: string[]) {
    let found = false;
    if (!user.role || !user.role.permissions) {
      return false;
    }
    user.role.permissions
      .concat(user.permissions)
      .forEach((permissionObject) => {
        if (permission.includes(permissionObject.name)) found = true;
      });
    return found;
  }

  async cant(user: User, permission: string[]) {
    return !this.can(user, permission);
  }


  async findRole(roleId: RoleId): Promise<Role> {
    return await this.prisma.role.findUnique({
      where: {
        id: roleId
      }
    })
  }
}
