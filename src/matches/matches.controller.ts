import { Controller, Get, HttpStatus, Logger, Query, Req, Res } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Matches')
@Controller('matches')
export class MatchesController {
  private readonly logger = new Logger(MatchesController.name);

  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all matches that satisfy the filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns all matches that satisfy the query parameters',
    type: MatchDto,
    example: [
      {
        matchDate: '2022-12-18',
        season: '2022-2023',
        competition: 'World Cup',
        home: false,
        team: 'Argentina',
        opponent: 'France',
        teamScore: 3,
        opponentScore: 3,
        goals: 2,
        assists: 0,
        started: true,
        minutesPlayed: 120,
        pensScored: 1,
        pensMissed: 0,
        hatTricks: 0,
        freeKicks: 0,
        insideBox: 1,
        outsideBox: 0,
        left: 1,
        right: 1,
        head: 0,
        other: 0,
        successfulDribbles: 0,
        motm: false,
      },
    ],
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while trying to fetch matches',
  })
  async findAllFiltered(
    @Req() req: Request,
    @Res() res: Response,
    @Query() findMatchDto: FindMatchDto,
  ): Promise<Response<MatchDto[]>> {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const requesterInfo = { ip, userAgent: req.headers['user-agent'] };
      this.logger.log(`Request made by ${requesterInfo.ip} using ${requesterInfo.userAgent}`);

      const matches: MatchDto[] = await this.matchesService.findAllFiltered(findMatchDto);
      return res.status(HttpStatus.OK).json(matches);
    } catch (error) {
      this.logger.error(`An error occurred while trying to fetch totals: ${error.message}`);

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while trying to fetch matches' });
    }
  }
}
