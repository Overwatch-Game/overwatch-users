import { registerAs } from '@nestjs/config';

import { AppConfig } from './config.type';

export const appConfig = registerAs<AppConfig>('app', () => ({
  apiKey: process.env.API_KEY,
  name: process.env.APP_NAME,
  environment: process.env.ENVIRONMENT,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  timeout: process.env.TIMEOUT ? parseInt(process.env.TIMEOUT, 10) : 1000,
}));
