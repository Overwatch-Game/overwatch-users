import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { authMock, authReadMock, authSignUpMock } from '../../../test';

describe('Auth Controller', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockReturnValue(authReadMock),
            signUp: jest.fn().mockReturnValue(authReadMock),
          },
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('Method - signIn', () => {
    it('should return the user JWT Token', async () => {
      const response = await authController.signIn(authMock);
      expect(response).toMatchObject(authReadMock);
    });
  });

  describe('Method - signUp', () => {
    it('should return the user JWT Token', async () => {
      const response = await authController.signUp(authSignUpMock);
      expect(response).toMatchObject(authReadMock);
    });
  });
});
