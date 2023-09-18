import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';

describe('User Repository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userRepository = app.get<UserRepository>(UserRepository);
  });

  it('UserRepository should be defined', async () => {
    expect(userRepository).toBeDefined();
  });
});
