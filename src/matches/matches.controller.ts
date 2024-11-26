import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';
import { Response } from 'express';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async findAllFiltered(@Res() res: Response, @Query() findMatchDto: FindMatchDto): Promise<Response<MatchDto[]>> {
    try {
      const matches: MatchDto[] = await this.matchesService.findAllFiltered(findMatchDto);
      return res.status(HttpStatus.OK).json(matches);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while trying to fetch matches' });
    }
  }
}
