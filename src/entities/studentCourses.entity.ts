import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BasePgEntity } from '../common/BaseEntity';
import { StudentEntity } from './students.entity';
import { IStudentCourses } from '@/interfaces/studentCourses.interface';
import { CourseEntity } from './courses.entity';

@Entity('student_courses')
export class StudentCourseEntity extends BasePgEntity implements IStudentCourses {
  @ManyToOne(() => StudentEntity, student => student.studentCourses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'student_id' })
  public student: StudentEntity;

  @ManyToOne(() => CourseEntity, course => course.studentCourses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  public course: CourseEntity;
}
