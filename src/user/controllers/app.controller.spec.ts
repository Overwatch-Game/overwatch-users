import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { userMock } from '../../../test';

describe('userController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            get: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('Method - getByEmail', () => {
    it('should return the user by email', async () => {
      const spyGetByEmail = jest
        .spyOn(userService, 'get')
        .mockResolvedValueOnce(userMock);

      const response = await userController.getByEmail({
        user: { email: userMock.email },
      } as any);

      expect(response).toMatchObject(userMock);
      expect(spyGetByEmail).toHaveBeenCalled();
    });
  });

  describe('Method - update', () => {
    it('should return the user updated', async () => {
      const spyGetByEmail = jest
        .spyOn(userService, 'update')
        .mockResolvedValueOnce(userMock);

      const response = await userController.update(
        {
          user: { email: userMock.email },
        } as any,
        userMock,
      );

      expect(response).toMatchObject(userMock);
      expect(spyGetByEmail).toHaveBeenCalled();
    });
  });
});
