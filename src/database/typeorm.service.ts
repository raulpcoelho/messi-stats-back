import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Match } from '../matches/entities/match.entity';
import { Competition } from '../competitions/entities/competition.entity';
import { Season } from '../seasons/entities/season.entity';
import { Team } from '../teams/entities/team.entity';
import { CreateTables1732337440742 } from './migrations/1732337440742-CreateTables';
import { Competitions1732338967859 } from './seeds/1732338967859-Competitions';
import { Seasons1732339620799 } from './seeds/1732339620799-Seasons';
import { Teams1732339964861 } from './seeds/1732339964861-Teams';
import { Matches1732340454118 } from './seeds/1732340454118-Matches';

config(); // use dotenv to make sure the environment variables are loaded before using it.

export class TypeOrmService extends DataSource implements OnModuleInit {
  constructor() {
    super({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      ssl: process.env.ENVIRONMENT === 'production' ? true : false,
      extra:
        process.env.ENVIRONMENT === 'production'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {},
      entities: [Competition, Match, Season, Team],
      migrations: [
        CreateTables1732337440742,
        Competitions1732338967859,
        Seasons1732339620799,
        Teams1732339964861,
        Matches1732340454118,
      ],
      synchronize: false,
      logging: false,
    });
  }

  async onModuleInit() {
    await this.initialize();
  }
}

const typeOrmService = new TypeOrmService();
export default typeOrmService;
