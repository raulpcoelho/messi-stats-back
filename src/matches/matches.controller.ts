import { Controller, Get, HttpStatus, Logger, Query, Req, Res } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FIND_ALL_MATCHES } from '../constants/examples';
import { FindMatchBetweenYearsDto } from './dto/find-match-between-years.dto';

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
    example: FIND_ALL_MATCHES,
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
      this.logger.error(`An error occurred while trying to fetch matches: ${error.message}`);

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while trying to fetch matches' });
    }
  }

  @Get('years')
  @ApiOperation({ summary: 'Get all matches between given years' })
  @ApiResponse({
    status: 200,
    description: 'Returns all matches between the given years',
    type: MatchDto,
    example: FIND_ALL_MATCHES,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'An error occurred while trying to fetch matches between years',
  })
  async findAllBetweenYears(
    @Req() req: Request,
    @Res() res: Response,
    @Query() findMatchBetweenYearsDto: FindMatchBetweenYearsDto,
  ): Promise<Response<MatchDto[]>> {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const requesterInfo = { ip, userAgent: req.headers['user-agent'] };
      this.logger.log(`Request made by ${requesterInfo.ip} using ${requesterInfo.userAgent}`);

      const matches: MatchDto[] = await this.matchesService.findAllBetweenYears(findMatchBetweenYearsDto);
      return res.status(HttpStatus.OK).json(matches);
    } catch (error) {
      this.logger.error(`An error occurred while trying to fetch matches between years: ${error.message}`);

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while trying to fetch matches between years' });
    }
  }
}
