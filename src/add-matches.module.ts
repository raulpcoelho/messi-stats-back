import { Module } from '@nestjs/common';
import { AddMatchesCommand } from './add-matches.command';
import { DatabaseModule } from './database/database.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [DatabaseModule, MatchesModule],
  controllers: [],
  providers: [AddMatchesCommand],
})
export class AddMatchesModule {}
