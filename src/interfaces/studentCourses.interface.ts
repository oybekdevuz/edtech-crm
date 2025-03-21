import { CourseEntity } from '@/entities/courses.entity';
import { StudentEntity } from '@/entities/students.entity';

export interface IStudentCourses {
  student: Promise<StudentEntity>;
  course: Promise<CourseEntity>;
}
