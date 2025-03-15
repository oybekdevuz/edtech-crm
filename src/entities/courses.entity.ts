import { Entity, Column, OneToMany } from 'typeorm';
import { BasePgEntity } from '@/common/BaseEntity';
import { ICourses } from '@/interfaces/courses.interface';
import { StudentCourseEntity } from '@/entities/studentCourses.entity';

@Entity('courses')
export class CourseEntity extends BasePgEntity implements ICourses {
  @Column({ type: 'varchar' })
  course_name: string;

  @Column({ type: 'varchar' })
  teacher_name: string;

  @Column({ type: 'bigint' })
  start_time: number;

  @Column({ type: 'varchar' })
  start_hour: string;

  @Column({ type: 'text', array: true, nullable: false })
  weeks: string[];

  @OneToMany(() => StudentCourseEntity, studentCourse => studentCourse.course)
  public studentCourses: StudentCourseEntity[];
}
