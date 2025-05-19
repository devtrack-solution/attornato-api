import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedDetail1699999999999 implements MigrationInterface {
  name = 'SeedDetail1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = ['ADM', 'Sucessão Empresarial', 'tutela antecipada', 'TUTELA DE URGÊNCIA']

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "details" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "details"`)
  }
}
