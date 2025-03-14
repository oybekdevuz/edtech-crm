import { Entity, Column } from 'typeorm';
import { IAdmin } from '@/interfaces/admins.interface';
import { BasePgEntity } from '../common/BaseEntity';

@Entity('admins')
export class AdminEntity extends BasePgEntity implements IAdmin {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;
}
