import { OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

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
      ...(process.env.ENVIRONMENT === 'production' && {
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      entities: [process.env.TYPEORM_ENTITIES],
      migrations: [process.env.TYPEORM_MIGRATIONS, process.env.TYPEORM_SEEDS],
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
