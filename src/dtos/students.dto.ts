import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  public first_name: string;

  @IsString()
  @IsNotEmpty()
  public last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  public phone_number: string;
}
