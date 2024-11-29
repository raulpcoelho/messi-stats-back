import { Module } from '@nestjs/common';
import { TotalsController } from './totals.controller';
import { TotalsService } from './totals.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TotalsController],
  providers: [TotalsService],
})
export class TotalsModule {}
