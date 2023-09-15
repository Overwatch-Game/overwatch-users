import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}
