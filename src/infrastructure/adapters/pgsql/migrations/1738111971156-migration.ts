import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1738111971156 implements MigrationInterface {
    name = 'Migration1738111971156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "isActive"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD "isActive" boolean NOT NULL`);
    }

}
