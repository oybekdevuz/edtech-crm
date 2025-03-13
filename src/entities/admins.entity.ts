import { IsNotEmpty } from 'class-validator';
import { Entity, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Admin } from '@interfaces/users.interface';
import { BasePgEntity } from '../common/BaseEntity';

@Entity('admins')
export class AdminEntity extends BasePgEntity implements Admin {
  @Column()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
