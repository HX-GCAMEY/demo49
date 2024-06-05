import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Get /users/ Returns an array of users with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get('/users');
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /users/:id returns an user with an OK status code', async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/0cbdce7d-7f2b-4d5f-b944-97a17111bc4d',
    );
    console.log(req.body);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it("Get /users/:id throws a NotFoundException if the user doesn't exists with a message Usuario no encontrado", async () => {
    const req = await request(app.getHttpServer()).get(
      '/users/0cbdce7d-7f2b-4d5f-b944-97a17111bc3d',
    );
    console.log(req.body);

    expect(req.status).toBe(404);
    expect(req.body.message).toBe('Usuario no encontrado');
  });

  it('Get /users/:id throws an error if id is not a UUID', async () => {
    const req = await request(app.getHttpServer()).get('/users/not-a-uuid');
    console.log(req.body);

    expect(req.status).toBe(400);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Post /users/signup creates a user with an OK status code', async () => {
    const req = await request(app.getHttpServer()).post('/users/signup').send({
      email: 'test@test.com',
      password: '123456',
      name: 'Test',
    });
    console.log(req.body);
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
  });
});
