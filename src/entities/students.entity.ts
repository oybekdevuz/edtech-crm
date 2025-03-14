import { Entity, Column } from 'typeorm';
import { BasePgEntity } from '../common/BaseEntity';
import { Istudent } from '@/interfaces/students.interface';

@Entity('students')
export class StudentEntity extends BasePgEntity implements Istudent {
  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  phone_number: string;
}
