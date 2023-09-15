import { Request } from 'express';
import { Get, Body, Patch, Controller, Req } from '@nestjs/common';

import { UserReadDto, UserUpdateDto } from '../dtos';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getByEmail(@Req() request: Request): Promise<UserReadDto> {
    const { email } = request['user'];
    return this.userService.get(email);
  }

  @Patch()
  update(
    @Req() request: Request,
    @Body() user: UserUpdateDto,
  ): Promise<UserReadDto> {
    const { email } = request['user'];
    return this.userService.update(email, user);
  }
}
