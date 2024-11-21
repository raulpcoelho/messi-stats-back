import { DataSource } from 'typeorm';

import { TypeOrmService } from './typeorm.service';

export default new TypeOrmService() as DataSource;
