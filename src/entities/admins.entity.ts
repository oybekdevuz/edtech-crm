import { IsNotEmpty } from 'class-validator';
import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IAdmin } from '@/interfaces/admins.interface';
import { BasePgEntity } from '../common/BaseEntity';

@Entity('admins')
export class AdminEntity extends BasePgEntity implements IAdmin {
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
