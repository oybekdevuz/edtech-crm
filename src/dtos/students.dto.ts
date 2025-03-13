import { IsString, IsNotEmpty, IsPhoneNumber, IsOptional } from 'class-validator';

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

export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  public first_name?: string;

  @IsString()
  @IsOptional()
  public last_name?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('UZ')
  public phone_number?: string;
}
