import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from '../entities/role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    repository: Repository<Role>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
