import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'adventure-simulation';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 4200;
  await app.listen(port);
  Logger.log(
    `🚀 Adventure is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
