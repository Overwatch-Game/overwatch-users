import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';

@Module({
  exports: [RoleService],
  providers: [RoleService, RoleRepository],
  imports: [TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
