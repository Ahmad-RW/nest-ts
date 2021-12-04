import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import * as authConfig from './auth.config';
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({ database: databaseConfig() }),
        () => ({ jwt: authConfig.jwtConfig() }),
      ],
    }),
  ],
})
export class ConfigModule {}
