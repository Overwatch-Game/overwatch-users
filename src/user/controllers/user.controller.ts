import {
  Get,
  Body,
  Param,
  Patch,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { UserReadDto, UserUpdateDto } from '../dtos';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getByEmail(@Param('email') email: string): Promise<UserReadDto> {
    return this.userService.get(email);
  }

  @Patch()
  update(
    @Body() user: UserUpdateDto,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserReadDto> {
    return this.userService.update(userId, user);
  }
}
