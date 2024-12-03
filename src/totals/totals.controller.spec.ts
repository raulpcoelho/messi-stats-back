import { Test, TestingModule } from '@nestjs/testing';
import { TotalsController } from './totals.controller';
import { TotalsService } from './totals.service';
import { MatchesRepository } from '../matches/matches.repository';
import { TotalsDto } from './dtos/totals.dto';
import { FindMatchDto } from 'src/matches/dto/find-match.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('TotalsController', () => {
  let controller: TotalsController;
  let service: TotalsService;

  const fakeResponse = {
    status: jest.fn(() => fakeResponse),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response<any, Record<string, any>>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalsController],
      providers: [TotalsService, { provide: MatchesRepository, useValue: {} }],
    }).compile();

    controller = module.get<TotalsController>(TotalsController);
    service = module.get<TotalsService>(TotalsService);
  });

  it('should return total stats of the matches that satisfy the filter (200)', async () => {
    const expectedTotals: TotalsDto = {
      totalGoals: 2,
      totalAssists: 1,
      totalMatches: 2,
      totalMinutes: 180,
      homeMatches: 1,
      awayMatches: 1,
      matchesWon: 1,
      matchesLost: 1,
      matchesStarted: 2,
      totalPensScored: 1,
      totalPensMissed: 0,
      totalHatTricks: 0,
      totalFreeKicks: 0,
      totalInsideBox: 1,
      totalOutsideBox: 0,
      totalLeft: 2,
      totalRight: 0,
      totalHeaded: 0,
      totalOtherBodyPart: 0,
      totalSuccessfulDribbles: 16,
      totalMotm: 1,
    };

    const findMatchDto: FindMatchDto = {
      year: 2011,
      opponent: 'Arsenal',
    };

    jest.spyOn(service, 'findAllFiltered').mockResolvedValue(expectedTotals);

    await controller.findAllFiltered(fakeResponse, findMatchDto);

    expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(fakeResponse.json).toHaveBeenCalledWith(expectedTotals);
  });

  it('should return an object with zeroed values when no matches satisfy the filter (200)', async () => {
    const expectedTotals: TotalsDto = {
      totalGoals: 0,
      totalAssists: 0,
      totalMatches: 0,
      totalMinutes: 0,
      homeMatches: 0,
      awayMatches: 0,
      matchesWon: 0,
      matchesLost: 0,
      matchesStarted: 0,
      totalPensScored: 0,
      totalPensMissed: 0,
      totalHatTricks: 0,
      totalFreeKicks: 0,
      totalInsideBox: 0,
      totalOutsideBox: 0,
      totalLeft: 0,
      totalRight: 0,
      totalHeaded: 0,
      totalOtherBodyPart: 0,
      totalSuccessfulDribbles: 0,
      totalMotm: 0,
    };

    const findMatchDto: FindMatchDto = {
      year: 2016,
      opponent: 'Manchester City',
      goals: 0,
    };

    jest.spyOn(service, 'findAllFiltered').mockResolvedValue(expectedTotals);

    await controller.findAllFiltered(fakeResponse, findMatchDto);

    expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(fakeResponse.json).toHaveBeenCalledWith(expectedTotals);
  });

  it('should return an error object when an error occurs (500)', async () => {
    const findMatchDto: FindMatchDto = {
      year: 2011,
      opponent: 'Arsenal',
    };

    jest.spyOn(service, 'findAllFiltered').mockRejectedValue(new Error());

    await controller.findAllFiltered(fakeResponse, findMatchDto);

    expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(fakeResponse.json).toHaveBeenCalledWith({ error: 'An error occurred while trying to fetch totals' });
  });
});
