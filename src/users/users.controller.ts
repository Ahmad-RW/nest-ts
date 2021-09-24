import { Controller, Get, Post, UseGuards, ValidationPipe, Request, UsePipes, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
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
    async getAllUsers(@Request() req): Promise<UserCollection> {
        const users = await this.userService.getAll()
        return new UserCollection(users)
    }

    @UseGuards(AuthGuard)
    @Get('/me')
    getUserInfo(@Request() req) : UserResource{
        const user : User = req.user;
        return new UserResource(user);

    }

    @Get('/deleteMe')
    @UseGuards(AuthGuard)
    delete(@Request() req):string{
        const user : User = req.user
        user.softRemove()

        return 'ok'
    }
}
