import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/entities/role.entity';
import { RoleId } from '../auth/enums/role.enum';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepo: UserRepository,
    @InjectRepository(Role) private readonly roleRepo : EntityRepository<Role>
  ) {}

  getUserByEmail(email: string): Promise<User> {
    return this.userRepo.getUserByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;
    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(createUserDto.password, user.salt);
    user.role = await this.roleRepo.findOne(RoleId[createUserDto.type]);
    this.userRepo.nativeInsert(user)
    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepo.find({});
  }
}
