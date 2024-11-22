import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [DatabaseModule, MatchesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
