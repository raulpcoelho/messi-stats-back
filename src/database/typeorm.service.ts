import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Match } from '../matches/entities/match.entity';
import { CreateMatchTable1732253421084 } from './migrations/1732253421084-CreateMatchTable';

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
      entities: [Match],
      migrations: [CreateMatchTable1732253421084],
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
