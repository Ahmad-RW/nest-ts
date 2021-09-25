import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import RolesPermissionsSeeder from '../src/database/seeds/roles.seed';
import FirstUserSeed from '../src/database/seeds/firstUser.seed';
import { User } from '../src/users/entities/user.entity';
import { Role } from '../src/auth/entities/role.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init()
    console.log('about to refresh');
    
    await useRefreshDatabase({
      configName : "src/database/connectionExport.ts"
    })
    await useSeeding({
      configName : "src/database/connectionExport.ts"
    })


     await runSeeder(RolesPermissionsSeeder)
     await runSeeder(FirstUserSeed)
     
  });


  it('/ (GET)', async () => {
    console.log(await User.find({}));
    
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET)', async () => {
    console.log(await User.find({}));
    console.log(await Role.find({}));
    
    
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });


  afterAll(async () =>{
    await tearDownDatabase()
    await app.close()
  })


});
