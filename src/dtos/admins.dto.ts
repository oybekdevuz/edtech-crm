import { IAdmin } from '@/interfaces/admins.interface';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateAdminDto implements IAdmin {
  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;
}
