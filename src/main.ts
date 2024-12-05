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

  const config = new DocumentBuilder()
    .setTitle('Messi Stats API')
    .setDescription('Stats for all Messi games')
    .setVersion('1.0.0')
    .setContact('Raul Coelho', null, 'rpc3@cin.ufpe.br')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, { customSiteTitle: 'Lionel Messi Stats' });

  app.enableCors({
    origin: '*',
  });

  await app.listen(3000);
}
bootstrap();
