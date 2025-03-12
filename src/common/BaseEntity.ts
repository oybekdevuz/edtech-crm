import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class BasePgEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  is_active!: boolean;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  is_deleted!: boolean;

  @Column({
    name: 'created_at',
    type: 'bigint',
    default: () => 'EXTRACT(epoch FROM NOW()) * 1000',
  })
  created_at!: number;

  @Column({
    name: 'updated_at',
    type: 'bigint',
    default: Date.now(),
  })
  updated_at!: number;

  @Column({ name: 'deleted_at', type: 'bigint', nullable: true })
  deleted_at!: number;
}
