import { Controller, Get, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { FindMatchDto } from './dto/find-match.dto';
import { MatchDto } from './dto/match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async findAllFiltered(@Query() findMatchDto: FindMatchDto): Promise<MatchDto[] | { error: string }> {
    try {
      return await this.matchesService.findAllFiltered(findMatchDto);
    } catch (error) {
      return { error: 'An error occurred while trying to fetch matches' };
    }
  }
}
