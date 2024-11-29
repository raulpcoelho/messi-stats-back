import * as fs from 'fs';
import * as path from 'path';
import { Test, TestingModule } from '@nestjs/testing';
import { TotalsService } from './totals.service';
import { MatchesRepository } from '../matches/matches.repository';
import { InMemoryMatchesRepository } from '../../test/repositories/in-memory.matches.repository';

describe('TotalsService', () => {
  let service: TotalsService;
  const matchesRepository: MatchesRepository = new InMemoryMatchesRepository();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotalsService, { provide: MatchesRepository, useValue: matchesRepository }],
    }).compile();

    service = module.get<TotalsService>(TotalsService);
  });

  it('should return total stats when there are no filters', async () => {
    const matches = await service.findAllFiltered({});

    const expected = await fs.promises.readFile(path.join(__dirname, '../../test/data/expected/totals.json'), 'utf-8');
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });

  it('should return total stats of the matches that satisfy the filter - first filter', async () => {
    const matches = await service.findAllFiltered({ pensScored: 1 });

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/filteredTotals.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });

  it('should return total stats of the matches that satisfy the filter - second filter', async () => {
    const matches = await service.findAllFiltered({ opponent: 'Poland', goals: 0 });

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/filteredTotals2.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });

  it('should return total stats of the matches that satisfy the filter - third filter', async () => {
    const matches = await service.findAllFiltered({ year: 2022 });

    const expected = await fs.promises.readFile(
      path.join(__dirname, '../../test/data/expected/filteredTotals3.json'),
      'utf-8',
    );
    const expectedJson = JSON.parse(expected);

    expect(matches).toEqual(expectedJson);
  });
});
