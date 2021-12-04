import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/entities/role.entity';
import { RoleId } from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
  ) {}

  getUserByEmail(email: string): Promise<User> {
    return this.userRepo.getUserByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log(await Role.findOne(RoleId[createUserDto.type]));

    const user = new User();
    user.email = createUserDto.email;
    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(createUserDto.password, user.salt);
    user.role = await Role.findOne(RoleId[createUserDto.type]);
    await user.save();
    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepo.find({});
  }
}
