import { MigrationInterface, QueryRunner } from "typeorm";

export class Upgrade1739576311746 implements MigrationInterface {
    name = 'Upgrade1739576311746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "last_change_by_user_id" character varying, "created_by_user_id" character varying, "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "ages" integer NOT NULL, "birthday" date NOT NULL, "height" integer NOT NULL, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be7cefd9ed12e65d6ec9682a1f" ON "todos" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b0fa30a980d6b20c42198b1af" ON "todos" ("updated_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee8b71d58e0eece40437cfad50" ON "todos" ("deleted_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_76d3ba018c7425b102444c02b8" ON "todos" ("is_active") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf8ba568164c709e4c5a139e32" ON "todos" ("last_change_by_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a931b5001214dfbdbbd3287d32" ON "todos" ("created_by_user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a931b5001214dfbdbbd3287d32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf8ba568164c709e4c5a139e32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_76d3ba018c7425b102444c02b8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee8b71d58e0eece40437cfad50"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b0fa30a980d6b20c42198b1af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be7cefd9ed12e65d6ec9682a1f"`);
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
