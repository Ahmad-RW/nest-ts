import {
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
  Request,
  UsePipes,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { WithPermissions } from '../auth/decorators/withPermissions.decorator';
import { WithRoles } from '../auth/decorators/withRoles.decorator';
import { Permissions } from 'src/auth/enums/permission.enum';
import { RoleId } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client'
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private userService: UsersService) {}

  //nest will bind request body to our class `CreateUserDto`
  //Built in validation pipe will trigger class-validator and will valdiate the values.
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user
  }

  @Get()
  @WithRoles(RoleId.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getAllUsers(@Request() req): Promise<User[]> {
    const users = await this.userService.getAll();
    return users
  }

  @WithPermissions(Permissions.viewOwnProfile)
  @UseGuards(AuthGuard, PermissionGuard)
  @Get('/me')
  getUserInfo(@Request() req): User {
    const user: User = req.user;
    return user
  }
}
