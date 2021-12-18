
import { BaseEntity, Collection, Entity, EntityManagerType, ManyToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { RoleId } from '../enums/role.enum';
import { Permission } from './permission.entity';

@Entity()
export class Role {

  @PrimaryKey()
  id: RoleId;

  @Property()
  name: string;

  @ManyToMany({entity : () => Permission, eager : true, joinColumn : 'role_id', inverseJoinColumn : 'permission_id'})
  permissions = new Collection<Permission>(this);
}
