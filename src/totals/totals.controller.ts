import { Controller, Get, HttpStatus, Logger, Query, Req, Res } from '@nestjs/common';
import { TotalsService } from './totals.service';
import { FindMatchDto } from '../matches/dto/find-match.dto';
import { TotalsDto } from './dtos/totals.dto';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FIND_ALL_TOTALS } from 'src/constants/examples';

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
    example: FIND_ALL_TOTALS,
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
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
      const requesterInfo = { ip, userAgent: req.headers['user-agent'] };
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
