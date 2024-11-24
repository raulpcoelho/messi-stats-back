import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmService } from 'src/database/typeorm.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MatchesController],
  providers: [MatchesService, TypeOrmService],
  exports: [MatchesService],
})
export class MatchesModule {}
