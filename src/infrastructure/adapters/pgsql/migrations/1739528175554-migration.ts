import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739528175554 implements MigrationInterface {
    name = 'Migration1739528175554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "birthday" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "birthday" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "full_name" character varying(100) NOT NULL`);
    }

}
