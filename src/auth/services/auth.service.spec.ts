import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import {
  authJWT,
  authMock,
  authReadMock,
  authSignUpMock,
  userMockEntity,
  userAuthMockRead,
  userAuthMockBadPasswordRead,
} from '../../../test';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';

describe('Auth Service', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            getByEmail: jest.fn().mockReturnValue(userAuthMockRead),
            create: jest.fn().mockReturnValue(userMockEntity),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockReturnValue(authJWT),
          },
        },
        AuthService,
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    userService = app.get<UserService>(UserService);
  });

  describe('Method - signIn', () => {
    it('should return the user JWT Token', async () => {
      const response = await authService.signIn(authMock);
      expect(response).toMatchObject(authReadMock);
    });

    it('should throw unauthorized exception', async () => {
      const spyGetByEmail = jest
        .spyOn(userService, 'getByEmail')
        .mockResolvedValueOnce(userAuthMockBadPasswordRead);

      try {
        await authService.signIn(authMock);
      } catch (error) {
        expect(spyGetByEmail).toHaveBeenCalled();
        expect(error.message).toBe('Credentials are not valid');
      }
    });

    it('should throw unauthorized exception - error pass', async () => {
      const spyGetByEmail = jest
        .spyOn(userService, 'getByEmail')
        .mockResolvedValueOnce(null);

      try {
        await authService.signIn(authMock);
      } catch (error) {
        expect(spyGetByEmail).toHaveBeenCalled();
        expect(error.message).toBe('Credentials are not valid');
      }
    });
  });

  describe('Method - signUn', () => {
    it('should return the user JWT Token', async () => {
      const response = await authService.signUp(authSignUpMock);
      expect(response).toMatchObject(authReadMock);
    });
  });
});
