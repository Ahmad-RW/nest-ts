import {MigrationInterface, QueryRunner} from "typeorm";

export class rolesPermissionsTable1632504285602 implements MigrationInterface {
    name = 'rolesPermissionsTable1632504285602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" integer NOT NULL, "name" character varying NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_has_permission" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_d18bce9e70703c46a507a683369" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca8ea79ab2016966aeba295d89" ON "role_has_permission" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_834ea967df63edbe515cb737ba" ON "role_has_permission" ("permission_id") `);
        await queryRunner.query(`CREATE TABLE "user_has_permission" ("user_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_9b94e296775aca3ec0d1145cede" PRIMARY KEY ("user_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bfdb3d8279b50783f38891e49" ON "user_has_permission" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f5037fa234ce4d65b964dd59b0" ON "user_has_permission" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_has_permission" ADD CONSTRAINT "FK_ca8ea79ab2016966aeba295d89b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_has_permission" ADD CONSTRAINT "FK_834ea967df63edbe515cb737ba8" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_has_permission" ADD CONSTRAINT "FK_8bfdb3d8279b50783f38891e499" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_has_permission" ADD CONSTRAINT "FK_f5037fa234ce4d65b964dd59b0e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_has_permission" DROP CONSTRAINT "FK_f5037fa234ce4d65b964dd59b0e"`);
        await queryRunner.query(`ALTER TABLE "user_has_permission" DROP CONSTRAINT "FK_8bfdb3d8279b50783f38891e499"`);
        await queryRunner.query(`ALTER TABLE "role_has_permission" DROP CONSTRAINT "FK_834ea967df63edbe515cb737ba8"`);
        await queryRunner.query(`ALTER TABLE "role_has_permission" DROP CONSTRAINT "FK_ca8ea79ab2016966aeba295d89b"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "role_id"`);
        await queryRunner.query(`DROP INDEX "IDX_f5037fa234ce4d65b964dd59b0"`);
        await queryRunner.query(`DROP INDEX "IDX_8bfdb3d8279b50783f38891e49"`);
        await queryRunner.query(`DROP TABLE "user_has_permission"`);
        await queryRunner.query(`DROP INDEX "IDX_834ea967df63edbe515cb737ba"`);
        await queryRunner.query(`DROP INDEX "IDX_ca8ea79ab2016966aeba295d89"`);
        await queryRunner.query(`DROP TABLE "role_has_permission"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
