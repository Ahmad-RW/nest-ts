import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { EntityRepository, Repository } from 'typeorm';


@Injectable()
export class UserRepository {

  constructor(private readonly prisma : PrismaService){}
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where : {
        email
      },
      include : {
        role : true
      }
    })
    return user
  }

  async create(user : Prisma.UserCreateArgs) : Promise<User>{
    return await this.prisma.user.create(user)
  }

  async findAll() : Promise<User[]>{
    return await this.prisma.user.findMany({})
  }
}
