import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SerializeInterceptor } from 'serialize-interceptor';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new SerializeInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  await app
    .listen(port)
    .then(() => console.log(`Server running on port ${port}`))
    .catch((error) => {
      throw error;
    });
}
bootstrap();
