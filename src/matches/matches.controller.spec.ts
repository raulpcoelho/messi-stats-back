import { Test, TestingModule } from '@nestjs/testing';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Response } from 'express';
import { MatchesRepository } from './matches.repository';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';
import { HttpStatus } from '@nestjs/common';

describe('/matches = the matches controller', () => {
  let controller: MatchesController;
  let service: MatchesService;

  const fakeResponse = {
    status: jest.fn(() => fakeResponse),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response<any, Record<string, any>>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchesController],
      providers: [MatchesService, { provide: MatchesRepository, useValue: {} }],
    }).compile();

    controller = module.get<MatchesController>(MatchesController);
    service = module.get<MatchesService>(MatchesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should return all matches that satisfy the filter when findAllFiltered is called', async () => {
    const expectedMatches: MatchDto[] = [
      {
        matchDate: new Date('2011-03-08'),
        season: '2010-2011',
        competition: 'Champions League',
        home: true,
        team: 'Barcelona',
        opponent: 'Arsenal',
        teamScore: 3,
        opponentScore: 1,
        goals: 2,
        assists: 0,
        started: true,
        minutesPlayed: 90,
        pensScored: 1,
        pensMissed: 0,
        hatTricks: 0,
        freeKicks: 0,
        insideBox: 1,
        outsideBox: 0,
        left: 2,
        right: 0,
        head: 0,
        other: 0,
        successfulDribbles: 10,
        motm: true,
      },
      {
        matchDate: new Date('2011-02-16'),
        season: '2010-2011',
        competition: 'Champions League',
        home: false,
        team: 'Barcelona',
        opponent: 'Arsenal',
        teamScore: 1,
        opponentScore: 2,
        goals: 0,
        assists: 1,
        started: true,
        minutesPlayed: 90,
        pensScored: 0,
        pensMissed: 0,
        hatTricks: 0,
        freeKicks: 0,
        insideBox: 0,
        outsideBox: 0,
        left: 0,
        right: 0,
        head: 0,
        other: 0,
        successfulDribbles: 6,
        motm: false,
      },
    ];

    jest.spyOn(service, 'findAllFiltered').mockResolvedValue(expectedMatches);

    const findMatchDto: FindMatchDto = {
      year: 2011,
      opponent: 'Arsenal',
    };

    jest.spyOn(service, 'findAllFiltered').mockResolvedValue(expectedMatches);
    await controller.findAllFiltered(fakeResponse, findMatchDto);

    expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(fakeResponse.json).toHaveBeenCalledWith(expectedMatches);
  });

  it('should return an error object when findAllFiltered throws an error', async () => {
    const findMatchDto: FindMatchDto = {
      year: 2011,
      opponent: 'Arsenal',
    };

    jest.spyOn(service, 'findAllFiltered').mockRejectedValue(new Error('An error occurred'));

    await controller.findAllFiltered(fakeResponse, findMatchDto);

    expect(fakeResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(fakeResponse.json).toHaveBeenCalledWith({ error: 'An error occurred while trying to fetch matches' });
  });
});
