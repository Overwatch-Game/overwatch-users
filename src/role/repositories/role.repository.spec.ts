import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

import { Role } from '../entities/role.entity';
import { RoleRepository } from './role.repository';

describe('Role Repository', () => {
  let roleRepository: RoleRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        {
          provide: getRepositoryToken(Role),
          useClass: Repository,
        },
      ],
    }).compile();

    roleRepository = app.get<RoleRepository>(RoleRepository);
  });

  it('RoleRepository should be defined', async () => {
    expect(roleRepository).toBeDefined();
  });
});
