import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {PrismaModule} from 'nestjs-prisma'
@Module({
  imports: [
    PrismaModule.forRootAsync({
      isGlobal : true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
    }),
  ],
})
export class DatabaseModule {}
