import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}

export class UpdateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password?: string;
}
