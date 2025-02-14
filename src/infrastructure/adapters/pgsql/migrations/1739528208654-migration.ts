import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739528208654 implements MigrationInterface {
    name = 'Migration1739528208654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "age" TO "ages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" RENAME COLUMN "ages" TO "age"`);
    }

}
