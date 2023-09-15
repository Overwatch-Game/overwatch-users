import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AuthGuard } from './guards/auth.guard';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('auth.jwtSecret'),
        signOptions: { expiresIn: configService.get('auth.jwtExpiresIn') },
      }),
    }),
  ],
  providers: [
    AuthService,
    {
      useClass: AuthGuard,
      provide: APP_GUARD,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
