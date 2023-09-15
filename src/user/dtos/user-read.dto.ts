import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

import { UserRole } from '../enum/user-role.enum';
import { Expose } from 'class-transformer';

export class UserReadDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  firstName: string;

  @IsString()
  @Expose()
  lastName: string;

  @IsString()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  phone: string;

  @IsString()
  @Expose()
  nickname: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  @Expose()
  role: UserRole;

  @IsBoolean()
  @Expose()
  isEnabled: boolean;
}
