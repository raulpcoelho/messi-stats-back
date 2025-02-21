import { CommandFactory } from 'nest-commander';
import { AddMatchesModule } from './add-matches.module';

async function bootstrap() {
  await CommandFactory.run(AddMatchesModule);
}

bootstrap();
