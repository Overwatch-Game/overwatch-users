import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { RoleModule } from '../role/role.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [RoleModule, TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
