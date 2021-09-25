import { SetMetadata } from '@nestjs/common';
import { RoleId } from '../enums/role.enum';

export const ROLES_KEY = 'roles'
export const WithRoles = (...roles: RoleId[]) => SetMetadata(ROLES_KEY, roles);
