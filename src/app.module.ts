import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MatchesModule } from './matches/matches.module';
import { SeasonsModule } from './seasons/seasons.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { TeamsModule } from './teams/teams.module';
import { TotalsModule } from './totals/totals.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule,
    MatchesModule,
    SeasonsModule,
    CompetitionsModule,
    TeamsModule,
    TotalsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
