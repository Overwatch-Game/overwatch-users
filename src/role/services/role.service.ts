import { Injectable } from '@nestjs/common';

import { RoleRepository } from '../repositories/role.repository';
import { RoleReadInterface } from '../interfaces/role-read.interface';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  public async get(roleName: string): Promise<RoleReadInterface> {
    return this.roleRepository.findOneBy({ name: roleName });
  }
}
