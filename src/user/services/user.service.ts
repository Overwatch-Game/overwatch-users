import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(user: UserCreateDto): Promise<User> {
    return this.userRepository.save(new User(user));
  }

  update(userId: number, user: UserUpdateDto): Promise<User> {
    const userDB = this.userRepository.findOneBy({ id: userId });
    if (!userDB) throw new NotFoundException('User not found');

    const userToUpdate = { userDB, ...user };
    return this.userRepository.save(userToUpdate);
  }
}
