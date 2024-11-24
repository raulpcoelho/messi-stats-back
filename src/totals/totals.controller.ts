import { Controller, Get, Query } from '@nestjs/common';
import { TotalsService } from './totals.service';
import { FindMatchDto } from 'src/matches/dto/find-match.dto';
import { TotalsDto } from './dtos/totals.dto';

@Controller('totals')
export class TotalsController {
  constructor(private readonly totalsService: TotalsService) {}
  @Get()
  async findAllFiltered(@Query() findMatchDto: FindMatchDto): Promise<TotalsDto | { error: string }> {
    try {
      return await this.totalsService.findAllFiltered(findMatchDto);
    } catch (error) {
      return { error: 'An error occurred while trying to fetch totals' };
    }
  }
}
