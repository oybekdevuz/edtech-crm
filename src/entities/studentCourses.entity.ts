import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BasePgEntity } from '../common/BaseEntity';
import { StudentEntity } from './students.entity';
import { IStudentCourses } from '@/interfaces/studentCourses.interface';
import { CourseEntity } from './courses.entity';

@Entity('student_courses')
export class StudentCourseEntity extends BasePgEntity implements IStudentCourses {
  @ManyToOne(() => StudentEntity, (student: StudentEntity) => student.studentCourses, { lazy: true })
  @JoinColumn({ name: 'student_id' })
  student: Promise<StudentEntity>;

  @ManyToOne(() => CourseEntity, (course: CourseEntity) => course.studentCourses, { lazy: true })
  @JoinColumn({ name: 'course_id' })
  course: Promise<CourseEntity>;
}
