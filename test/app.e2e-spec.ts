import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/matches (GET)', async () => {
    const expected = await fs.promises.readFile('test/data/expected/allMatches.json', 'utf-8');
    const expectedJson = JSON.parse(expected);
    await request(app.getHttpServer())
      .get('/matches?year=2022&competition=World%20Cup')
      .expect(200)
      .expect(expectedJson);
  });

  it('/totals (GET)', async () => {
    const expected = await fs.promises.readFile('test/data/expected/totals.json', 'utf-8');
    const expectedJson = JSON.parse(expected);
    await request(app.getHttpServer())
      .get('/totals?year=2022&competition=World%20Cup')
      .expect(200)
      .expect(expectedJson);
  });
});
