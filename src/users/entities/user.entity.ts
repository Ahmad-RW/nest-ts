
import * as bcrypt from 'bcrypt';
import { Role } from '../../auth/entities/role.entity';
import { Permission } from '../../auth/entities/permission.entity';
import { Exclude, Transform } from 'class-transformer';
import { Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  email: string;

  @Property()
  @Exclude()
  password: string;

  @Property()
  @Exclude()
  salt: string;


  @Property({ onUpdate: () => new Date() })
  @Exclude()
  updatedAt = new Date();

  @Property()
  @Exclude()
  deletedAt: Date;

  @Property()
  @Exclude()
  createdAt: Date = new Date()


  @ManyToMany({ entity: () => Permission, eager:true, joinColumn : 'user_id', inverseJoinColumn : 'permission_id', })
  permissions = new Collection<Permission>(this)

  @ManyToOne({entity: ()=> Role, eager : true, joinColumn : 'role_id'})
  @Transform(({value})=>value.name)
  role: Role;

  async verifyPassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
