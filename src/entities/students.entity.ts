import { IsNotEmpty } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { BasePgEntity } from '../common/BaseEntity';
import { Istudent } from '@/interfaces/students.interface';

@Entity('students')
export class StudentEntity extends BasePgEntity implements Istudent {
  @Column()
  @IsNotEmpty()
  first_name: string;

  @Column()
  @IsNotEmpty()
  last_name: string;

  @Column()
  @IsNotEmpty()
  phone_number: string;
}
