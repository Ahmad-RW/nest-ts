import { UnderscoreNamingStrategy } from '@mikro-orm/core';
import { MikroOrmModuleAsyncOptions, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export default (): MikroOrmModuleOptions =>
  process.env.NODE_ENV === 'test'
    ? {

    }
    : {
      // type: 'postgres',
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      // entities: [join(__dirname, '../', '/**/*.entity{.ts,.js}')],
      // logging: process.env.ORM_LOGGING === 'true',
      // // We are using migrations, synchronize should be set to false.
      // synchronize: false,
      // migrationsTableName: 'migrations',
      // namingStrategy: new SnakeNamingStrategy(),
      // // Run migrations automatically,
      // // you can disable this if you prefer running migration manually.
      // migrationsRun: false,
      // // Allow both start:prod and start:dev to use migrations
      // // __dirname is either dist or src folder, meaning either
      // // the compiled js in prod or the ts in dev.
      // migrations: [
      //   join(__dirname, '../', '/database/migrations/**/*{.ts,.js}'),
      // ],
      // cli: {
      //   // Location of migration should be inside src folder
      //   // to be compiled into dist/ folder.
      //   migrationsDir: join(__dirname, '../', '/database/migrations/**/*{.ts,.js}'),
      // },
      autoLoadEntities: true,
      type: 'postgresql',
      entitiesTs: ['src/**/*.entity.ts'],
      entities:  [join(__dirname, '../', '/**/*.entity{.js}')],
      discovery: {
        warnWhenNoEntities: true,
        requireEntitiesArray: false,
      },
      name: 'ctb_db',
      dbName: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      namingStrategy: UnderscoreNamingStrategy,
      validate: true,
      strict: true,
      debug: ['discovery', 'info'],
      migrations: {
        tableName: "migrations",
        path: join(__dirname, '../', '/database/migrations/'),
        allOrNothing: false,
        emit: 'ts',
      }
    };

class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.concat('').join('_')) +
      (customName ? customName : snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(relationName + '_' + referencedColumnName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return snakeCase(
      firstTableName +
      '_' +
      firstPropertyName.replace(/\./gi, '_') +
      '_' +
      secondTableName,
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      tableName + '_' + (columnName ? columnName : propertyName),
    );
  }

  classTableInheritanceParentColumnName(
    parentTableName: any,
    parentTableIdPropertyName: any,
  ): string {
    return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return alias + '__' + propertyPath.replace('.', '_');
  }
}
