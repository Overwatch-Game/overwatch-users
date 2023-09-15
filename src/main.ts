import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SerializeInterceptor } from 'serialize-interceptor';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/interceptors/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new SerializeInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  await app
    .listen(port)
    .then(() => logger.log(`Server running on port ${port}`))
    .catch((error) => {
      throw error;
    });
}

bootstrap();
