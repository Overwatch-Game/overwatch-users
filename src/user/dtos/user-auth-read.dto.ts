import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class UserAuthReadDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  email: string;

  @IsString()
  @Expose()
  password: string;
}
