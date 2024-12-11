import { Controller, Get, HttpStatus, Logger, Query, Req, Res } from '@nestjs/common';
import { TotalsService } from './totals.service';
import { FindMatchDto } from '../matches/dto/find-match.dto';
import { TotalsDto } from './dtos/totals.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('totals')
export class TotalsController {
  private readonly logger = new Logger(TotalsController.name);

  constructor(private readonly totalsService: TotalsService) {}
  @Get()
  @ApiOperation({ summary: 'Get the total stats of the matches that satisfy the filters' })
  @ApiResponse({
    status: 200,
    description: 'Returns the total stats of the matches that satisfy the query parameters',
    type: TotalsDto,
    example: {
      totalGoals: 7,
      totalAssists: 3,
      totalMatches: 7,
      totalMinutes: 690,
      homeMatches: 0,
      awayMatches: 7,
      matchesWon: 4,
      matchesLost: 1,
      matchesStarted: 7,
      totalPensScored: 4,
      totalPensMissed: 1,
      totalHatTricks: 0,
      totalFreeKicks: 0,
      totalInsideBox: 2,
      totalOutsideBox: 1,
      totalLeft: 6,
      totalRight: 1,
      totalHeaded: 0,
      totalOtherBodyPart: 0,
      totalSuccessfulDribbles: 15,
      totalMotm: 2,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while trying to fetch totals',
  })
  async findAllFiltered(
    @Req() req: Request,
    @Res() res: Response,
    @Query() findMatchDto: FindMatchDto,
  ): Promise<Response<TotalsDto>> {
    try {
      const requesterInfo = { ip: req.ip, userAgent: req.headers['user-agent'] };
      this.logger.log(`Request made by ${requesterInfo.ip} using ${requesterInfo.userAgent}`);
      const totals: TotalsDto = await this.totalsService.findAllFiltered(findMatchDto);
      return res.status(HttpStatus.OK).json(totals);
    } catch (error) {
      this.logger.error(`An error occurred while trying to fetch totals: ${error.message}`);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while trying to fetch totals' });
    }
  }
}
