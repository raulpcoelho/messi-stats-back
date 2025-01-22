import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('/api'); //not needed anymore

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: false,
      whitelist: true,
    }),
  );

  const description =
    'This is an API that provides detailed statistics for all matches played by Lionel Messi. You can filter the data by year, opponents, season, competition, and others to get specific insights. The data is updated regularly as Messi plays new matches.';

  const config = new DocumentBuilder()
    .setTitle('Messi Stats API')
    .setDescription(description)
    .setVersion('1.0.0')
    .setContact('Raul Coelho', 'https://www.github.com/raulpcoelho', 'rpc3@cin.ufpe.br')
    .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, { customSiteTitle: 'Lionel Messi Stats' });

  app.enableCors({
    origin: '*',
  });

  await app.listen(8080, '::');
}
bootstrap();
