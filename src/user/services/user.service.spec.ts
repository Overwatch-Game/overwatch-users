import { Test, TestingModule } from '@nestjs/testing';

import {
  roleMock,
  userMock,
  userMockByEmail,
  userMockEntity,
  userMockRead,
} from '../../../test';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { RoleService } from '../../role/services/role.service';
import { UserRepository } from '../repositories/user.repository';

describe('User Service', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RoleService,
          useValue: {
            get: jest.fn().mockReturnValue(roleMock),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn().mockReturnValue(new User(userMockByEmail)),
            create: jest.fn().mockReturnValue(userMockEntity),
            save: jest.fn().mockReturnValue(new User(userMockEntity)),
            findOneBy: jest.fn().mockReturnValue(new User(userMockEntity)),
          },
        },
        UserService,
      ],
    }).compile();

    userService = app.get<UserService>(UserService);
    userRepository = app.get<UserRepository>(UserRepository);
  });

  describe('Method - get', () => {
    it('should return the user by email', async () => {
      const response = await userService.get(userMock.email);
      expect(response).toMatchObject(userMockRead);
    });
  });

  describe('Method - create', () => {
    it('should return the user created', async () => {
      const response = await userService.create(userMock);
      expect(response).toMatchObject(userMockRead);
    });
  });

  describe('Method - update', () => {
    it('should return the user updated', async () => {
      const response = await userService.update(userMock.email, userMock);

      expect(response).toMatchObject(userMockRead);
    });

    it('should return not found exception', async () => {
      const spyFindOne = jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(null);

      try {
        await userService.update(userMock.email, userMock);
      } catch (error) {
        expect(error.message).toBe('User not found');
        expect(spyFindOne).toHaveBeenCalled();
      }
    });
  });

  describe('Method - getByEmail', () => {
    it('should return the user by email', async () => {
      const response = await userService.getByEmail(userMock.email);
      expect(response).toMatchObject(userMockByEmail);
    });
  });
});
