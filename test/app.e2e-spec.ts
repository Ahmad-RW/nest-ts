import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { runSeeder, tearDownDatabase, useRefreshDatabase, useSeeding } from 'typeorm-seeding';
import RolesPermissionsSeeder from '../src/database/seeds/roles.seed';
import FirstUserSeed from '../src/database/seeds/firstUser.seed';
import { User } from '../src/users/entities/user.entity';
import { Role } from '../src/auth/entities/role.entity';
import exp from 'constants';




describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init()
    
    await useRefreshDatabase({
      configName : "src/database/connectionExport.ts"
    })
    await useSeeding({
      configName : "src/database/connectionExport.ts"
    })


     await runSeeder(RolesPermissionsSeeder)
     await runSeeder(FirstUserSeed)
     
  });


  it('should get hello world', async () => {
    
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('should log in', async () => {
    let response = await login(app)
    expect(response.body.accessToken).toBeTruthy()
  });


  it('should fetch me', async () => {

    let response = await login(app)
    const accessToken = response.body.accessToken
    response = await request(app.getHttpServer())
    .get('/users/me')
    .set('Authorization', `Bearer ${accessToken}`)
    .expect(200)

    expect(response.body).toBeTruthy()
  });


  afterAll(async () =>{
    await tearDownDatabase()
    await app.close()
  })
});



async function login(app : INestApplication){
  const response = await request(app.getHttpServer())
    .post('/auth')
    .send({
      email : 'test@test.com',
      password : '111'
    })
    .expect(200)
    return response
}