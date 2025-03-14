import { IsNotEmpty, IsUUID } from 'class-validator';

export class EnrollStudentDto {
  @IsUUID()
  @IsNotEmpty()
  public student_id: string;

  @IsUUID()
  @IsNotEmpty()
  public course_id: string;
}
