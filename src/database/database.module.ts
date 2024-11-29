import { Module } from '@nestjs/common';
import { TypeOrmService } from './typeorm.service';
import { MatchesRepository } from '../matches/matches.repository';
import { TypeOrmMatchesRepository } from './repositories/typeorm.matches.repository';

@Module({
  providers: [TypeOrmService, { provide: MatchesRepository, useClass: TypeOrmMatchesRepository }],
  exports: [MatchesRepository],
})
export class DatabaseModule {}
