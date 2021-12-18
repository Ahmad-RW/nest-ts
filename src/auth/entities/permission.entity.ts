import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Permissions } from '../enums/permission.enum';

@Entity()
export class Permission  {
  @PrimaryKey()
  id: number;

  @Property()
  name: Permissions;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  deletedAt: Date;

  @Property()
  createdAt: Date = new Date()
}
