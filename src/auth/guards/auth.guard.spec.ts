import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { authJWT } from '../../../test';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let reflector: Reflector;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('XYZ123'),
          },
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
    reflector = module.get<Reflector>(Reflector);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should allow access to public route', async () => {
    const reflectorSpy = jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(true);

    const request = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    };
    const canActivate = await authGuard.canActivate(request as any);

    expect(reflectorSpy).toHaveBeenCalled();
    expect(canActivate).toBe(true);
  });

  it('should throw UnauthorizedException if no token provided', async () => {
    const request = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: undefined,
          },
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    };

    await expect(authGuard.canActivate(request as any)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(authGuard.canActivate(request as any)).rejects.toMatchObject({
      response: {
        statusCode: 401,
        message: 'Invalid token',
        error: 'Unauthorized',
      },
    });
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const token = 'invalid_token';
    const request = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    };

    jwtService.verifyAsync = jest
      .fn()
      .mockRejectedValue(new Error('Invalid token'));

    await expect(authGuard.canActivate(request as any)).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(authGuard.canActivate(request as any)).rejects.toMatchObject({
      response: {
        statusCode: 401,
        message: 'Invalid token',
        error: 'Unauthorized',
      },
    });
  });

  it('should set user property on request if token is valid', async () => {
    const payload = { sub: '1234', email: 'diego@mail.com' };
    const request = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: `Bearer ${authJWT}`,
          },
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    };

    const spyJWTVerify = (jwtService.verifyAsync = jest
      .fn()
      .mockResolvedValue(payload));

    const canActivate = await authGuard.canActivate(request as any);

    expect(spyJWTVerify).toHaveBeenCalled();
    expect(canActivate).toBe(true);
  });
});
