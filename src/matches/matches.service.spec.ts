import * as fs from 'fs';
import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { MatchesService } from './matches.service';
import { MatchesRepository } from './matches.repository';
import { InMemoryMatchesRepository } from '../../test/repositories/in-memory.matches.repository';

describe('MatchesService', () => {
  let service: MatchesService;
  const repository: MatchesRepository = new InMemoryMatchesRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchesService, { provide: MatchesRepository, useValue: repository }],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
  });

  it('should return all matches when there are no filters', async () => {
    const matches = await service.findAllFiltered({});

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/allMatches.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });

  it('should return matches that satisfy the filters - first filter', async () => {
    const matches = await service.findAllFiltered({ pensScored: 1 });

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/filteredMatches.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });

  it('should return matches that satisfy the filters - second filter', async () => {
    const matches = await service.findAllFiltered({ opponent: 'Poland', goals: 0 });

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/filteredMatches2.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });

  it('should return matches that satisfy the filters - third filter', async () => {
    const matches = await service.findAllFiltered({ year: 2022 });

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/filteredMatches3.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });
});
