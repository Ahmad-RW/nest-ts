import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';
import { ROLES_KEY } from '../decorators/withRoles.decorator';
import { RoleId } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleId[]>(ROLES_KEY, context.getHandler());
    const user: User = context.switchToHttp().getRequest().user;
    if (roles.includes(user.role.id)) return true;
    return false;
  }
}
