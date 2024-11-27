import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { TotalsService } from './totals.service';
import { FindMatchDto } from '../matches/dto/find-match.dto';
import { TotalsDto } from './dtos/totals.dto';
import { Response } from 'express';

@Controller('totals')
export class TotalsController {
  constructor(private readonly totalsService: TotalsService) {}
  @Get()
  async findAllFiltered(@Res() res: Response, @Query() findMatchDto: FindMatchDto): Promise<Response<TotalsDto>> {
    try {
      const totals: TotalsDto = await this.totalsService.findAllFiltered(findMatchDto);
      return res.status(HttpStatus.OK).json(totals);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred while trying to fetch totals' });
    }
  }
}
