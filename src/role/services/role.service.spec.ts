import { Test, TestingModule } from '@nestjs/testing';

import { RoleService } from './role.service';
import { Role } from '../entities/role.entity';
import { roleMock, userMock } from '../../../test';
import { RoleRepository } from '../repositories/role.repository';

describe('Role Service', () => {
  let roleService: RoleService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RoleRepository,
          useValue: {
            findOneBy: jest.fn().mockReturnValue(new Role(roleMock)),
          },
        },
        RoleService,
      ],
    }).compile();

    roleService = app.get<RoleService>(RoleService);
  });

  describe('Method - get', () => {
    it('should return the user by email', async () => {
      const response = await roleService.get(userMock.role);
      expect(response).toMatchObject(roleMock);
    });
  });
});
