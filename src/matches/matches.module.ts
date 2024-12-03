import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmService } from '../database/typeorm.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MatchesController],
  providers: [MatchesService, TypeOrmService],
})
export class MatchesModule {}
