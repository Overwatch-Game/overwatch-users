import { plainToClass, plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { UserUpdateDto, UserReadDto } from '../dtos';
import { RoleService } from '../../role/services/role.service';
import { UserRepository } from '../repositories/user.repository';
import { UserCreateInterface } from '../interfaces/user-create.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userRepository: UserRepository,
  ) {}

  public async get(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return plainToInstance(UserReadDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async create(user: UserCreateInterface): Promise<UserReadDto> {
    const { role, ...userRequest } = user;
    const { id: roleId } = await this.roleService.get(role);
    const userToSave = this.userRepository.create({ ...userRequest, roleId });
    const userSaved = await this.userRepository.save(userToSave);

    return plainToInstance(UserReadDto, userSaved, {
      excludeExtraneousValues: true,
    });
  }

  public async update(
    userId: number,
    user: UserUpdateDto,
  ): Promise<UserReadDto> {
    const { role, ...userRequest } = user;

    let roleId: number;
    if (role) {
      const { id } = await this.roleService.get(role);
      roleId = id;
    }

    const userDB = this.userRepository.findOneBy({ id: userId });
    if (!userDB) throw new NotFoundException('User not found');

    const userToUpdate = { userDB, ...userRequest };
    const userUpdated = await this.userRepository.save({
      userToUpdate,
      roleId,
    });

    return plainToInstance(UserReadDto, userUpdated, {
      excludeExtraneousValues: true,
    });
  }

  public async getByEmail(email: string): Promise<UserReadDto> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    return plainToClass(UserReadDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
