import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';
import { PERMISSIONS_KEY } from '../decorators/withPermissions.decorator';


@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) { }
  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    const allowedPermissions = this.reflector.get<string[]>(PERMISSIONS_KEY, context.getHandler())
    const user: User = context.switchToHttp().getRequest().user
    if (await this.authService.can(user, allowedPermissions)) return true
    return false
  }
}
