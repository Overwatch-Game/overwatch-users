import { registerAs } from '@nestjs/config';

import { AuthConfig } from './config.type';

export const authConfig = registerAs<AuthConfig>('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));
