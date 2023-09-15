import {
  IsEnum,
  Matches,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole } from '../../user/enum/user-role.enum';

export class AuthSignupDto {
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

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
