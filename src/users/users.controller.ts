import { Controller, Get, Post, UseGuards, ValidationPipe, Request, UsePipes, Body } from '@nestjs/common';
import { config } from 'process';
import { WithPermissions } from '../auth/decorators/withPermissions.decorator';
import { WithRoles } from '../auth/decorators/withRoles.decorator';
import { Role } from '../auth/entities/role.entity';
import { Permissions } from '../auth/enums/permission.enum';
import { RoleId } from '../auth/enums/role.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserResource } from './resources/user.resource';
import { UserCollection } from './resources/userCollection.resource';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }


    //nest will bind request body to our class `CreateUserDto`
    //Built in validation pipe will trigger class-validator and will valdiate the values.
    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResource> {
        const user = await this.userService.createUser(createUserDto)
        console.log(user);

        return new UserResource(user)
    }

    @Get()
    @WithRoles(RoleId.admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getAllUsers(@Request() req): Promise<UserCollection> {
        const users = await this.userService.getAll()
        console.log(req.user);
        
        return new UserCollection(users)
    }


    @WithPermissions(Permissions.viewOwnProfile)
    @UseGuards(AuthGuard, PermissionGuard)
    @Get('/me')
    getUserInfo(@Request() req) : UserResource{
        const user : User = req.user;
        console.log(user);
        
        return new UserResource(user);

    }

}
