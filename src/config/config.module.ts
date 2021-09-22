import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import databaseConfig from './database.config';
@Module({
    imports : [NestConfigModule.forRoot({
        isGlobal : true,
        load : [
            () => ({database : databaseConfig()})
        ]
    })]
})
export class ConfigModule {}
