import { IsString } from 'class-validator';

export class AuthSigninDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
