import { IsString, IsNotEmpty, IsNumber, ArrayNotEmpty, IsArray, IsIn } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  public course_name: string;

  @IsString()
  @IsNotEmpty()
  public teacher_name: string;

  @IsNumber()
  @IsNotEmpty()
  public start_time: number;

  @IsString()
  @IsNotEmpty()
  public start_hour: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'], { each: true })
  public weeks: string;
}
