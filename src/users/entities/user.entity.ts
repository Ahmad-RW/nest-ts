import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../auth/entities/role.entity';
import { Permission } from '../../auth/entities/permission.entity';
import { Exclude, Transform } from 'class-transformer';
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @VersionColumn()
  @Exclude()
  version: number;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    name: 'user_has_permission',
  })
  permissions: Permission[];

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({
    name: 'role_id',
    referencedColumnName: 'id',
  })
  @Transform(({value})=>value.name)
  role: Role;

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
