import { Migration } from '@mikro-orm/migrations';

export class Migration20211218131108 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" jsonb not null, "name" varchar(255) not null);');
    this.addSql('alter table "role" add constraint "role_pkey" primary key ("id");');

    this.addSql('create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "salt" varchar(255) not null, "updated_at" jsonb not null, "deleted_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "role_id" jsonb not null);');

    this.addSql('create table "permission" ("id" serial primary key, "name" jsonb not null, "updated_at" jsonb not null, "deleted_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');

    this.addSql('create table "role_permissions" ("role_id" jsonb not null, "permission_id" int4 not null);');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_pkey" primary key ("role_id", "permission_id");');

    this.addSql('create table "user_permissions" ("user_id" int4 not null, "permission_id" int4 not null);');
    this.addSql('alter table "user_permissions" add constraint "user_permissions_pkey" primary key ("user_id", "permission_id");');

    this.addSql('alter table "user" add constraint "user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');

    this.addSql('alter table "role_permissions" add constraint "role_permissions_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "role_permissions" add constraint "role_permissions_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "user_permissions" add constraint "user_permissions_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "user_permissions" add constraint "user_permissions_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;');
  }


  async down(): Promise<void> {
    this.addSql('drop table "user" CASCADE')
    this.addSql('drop table "role" CASCADE')
    this.addSql('drop table "permission" CASCADE')
  }
}
