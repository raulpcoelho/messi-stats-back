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

  it('/matches (GET): World Cup 2022 filter', async () => {
    const expected = await fs.promises.readFile('test/data/expected/allMatches.json', 'utf-8');
    const expectedJson = JSON.parse(expected);
    await request(app.getHttpServer())
      .get('/matches?year=2022&competition=World%20Cup')
      .expect(200)
      .expect(expectedJson);
  });

  it('/matches (GET) - no matches', async () => {
    await request(app.getHttpServer()).get('/matches?goals=6').expect(200).expect([]);
  });

  it('/matches (GET): World Cup 2022, 0 goal filter', async () => {
    const expected = await fs.promises.readFile('test/data/expected/filteredMatches2.json', 'utf-8');
    const expectedJson = JSON.parse(expected);
    await request(app.getHttpServer())
      .get('/matches?year=2022&competition=World%20Cup&goals=0')
      .expect(200)
      .expect(expectedJson);
  });

  it('/totals (GET): World Cup 2022 filter', async () => {
    const expected = await fs.promises.readFile('test/data/expected/totals.json', 'utf-8');
    const expectedJson = JSON.parse(expected);
    await request(app.getHttpServer())
      .get('/totals?year=2022&competition=World%20Cup')
      .expect(200)
      .expect(expectedJson);
  });

  it('/totals (GET): World Cup 2022, 0 goal filter', async () => {
    const expected = await fs.promises.readFile('test/data/expected/filteredTotals2.json', 'utf-8');
    const expectedJson = JSON.parse(expected);
    await request(app.getHttpServer())
      .get('/totals?year=2022&competition=World%20Cup&goals=0')
      .expect(200)
      .expect(expectedJson);
  });
});
