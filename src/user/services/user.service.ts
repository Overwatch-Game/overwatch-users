import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { UserCreateDto, UserUpdateDto, UserReadDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async get(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return plainToInstance(UserReadDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async create(user: UserCreateDto): Promise<UserReadDto> {
    const userToSave = this.userRepository.create(user);
    const userSaved = await this.userRepository.save(userToSave);
    return plainToInstance(UserReadDto, userSaved, {
      excludeExtraneousValues: true,
    });
  }

  public async update(
    userId: number,
    user: UserUpdateDto,
  ): Promise<UserReadDto> {
    const userDB = this.userRepository.findOneBy({ id: userId });
    if (!userDB) throw new NotFoundException('User not found');

    const userToUpdate = { userDB, ...user };
    const userUpdated = await this.userRepository.save(userToUpdate);
    return plainToInstance(UserReadDto, userUpdated, {
      excludeExtraneousValues: true,
    });
  }
}
