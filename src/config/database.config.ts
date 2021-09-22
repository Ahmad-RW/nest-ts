import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { join } from "path"

export default () : TypeOrmModuleOptions => (process.env.NODE_ENV === 'test' ? 
{
    type : 'sqlite',
    database : ':memory:',
    logging : false,
    synchronize: true,
    entities: [join(__dirname, '../', '/**/*.entity{.ts,.js}')],
} 
: 
{
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [join(__dirname, '../', '/**/*.entity{.ts,.js}')],
    logging: process.env.ORM_LOGGING === "true",
    // We are using migrations, synchronize should be set to false.
    synchronize: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: false,
    // Allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev.
    migrations: [join(__dirname, '../', '/database/migrations/**/*{.ts,.js}')],
    cli: {
        // Location of migration should be inside src folder
        // to be compiled into dist/ folder.
        migrationsDir: 'src/database/migrations',
    },
}
) 