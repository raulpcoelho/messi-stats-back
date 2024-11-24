import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MatchesModule } from './matches/matches.module';
import { SeasonsModule } from './seasons/seasons.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [DatabaseModule, MatchesModule, SeasonsModule, CompetitionsModule, TeamsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
