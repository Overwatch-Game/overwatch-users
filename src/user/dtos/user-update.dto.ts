import { PartialType } from '@nestjs/swagger';

import { UserCreateDto } from './user-create.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UserUpdateDto extends PartialType(UserCreateDto) {
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
