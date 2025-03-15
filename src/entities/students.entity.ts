import { Entity, Column, OneToMany } from 'typeorm';
import { BasePgEntity } from '../common/BaseEntity';
import { Istudent } from '@/interfaces/students.interface';
import { StudentCourseEntity } from './studentCourses.entity';

@Entity('students')
export class StudentEntity extends BasePgEntity implements Istudent {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  phone_number: string;

  @OneToMany(() => StudentCourseEntity, (studentCourse: StudentCourseEntity) => studentCourse.student, { lazy: true })
  studentCourses: Promise<StudentCourseEntity[]>;
}
