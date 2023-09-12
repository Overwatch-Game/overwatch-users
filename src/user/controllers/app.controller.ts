import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiKeyGuard } from '../auth/api-key.guard';
import { UserService } from '../services/user.service';
import { UserReadDto, UserCreateDto, UserUpdateDto } from '../dtos';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  get(@Param('userId', ParseIntPipe) userId: number): Promise<UserReadDto> {
    return this.userService.get(userId);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() user: UserCreateDto): Promise<UserReadDto> {
    return this.userService.create(user);
  }

  @Patch()
  @UseGuards(ApiKeyGuard)
  update(
    @Body() user: UserUpdateDto,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserReadDto> {
    return this.userService.update(userId, user);
  }
}
