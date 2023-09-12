import { IsEnum, IsString } from 'class-validator';

import { UserRole } from '../enum/user-role.enum';

export class UserCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  nickname: string;

  @IsEnum(UserRole)
  role: UserRole;
}
