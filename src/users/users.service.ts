import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Prisma, User } from '@prisma/client'
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { RoleId } from '../auth/enums/role.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UserRepository,
    private readonly authService: AuthService
  ) { }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepo.getUserByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(createUserDto.password, salt)
    const user: Prisma.UserCreateArgs = {
      data: {
        email: createUserDto.email,
        salt,
        password,
        role: {
          connect: { id: RoleId[createUserDto.type] }
        },
        test : "test"
      }
    }
    return this.userRepo.create(user);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepo.findAll()
  }


  async verifyPassword(user : User, password : string) : Promise<boolean>{
    return await bcrypt.compare(password, user.password);
  }
}
