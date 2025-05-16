import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedPrognosis1699999999999 implements MigrationInterface {
  name = 'SeedPrognosis1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'Improcedência Provável_#_0',
      'Indefinido_#_0',
      'Procedência Parcial Provável_#_0',
      'Procedência Provável_#_0',
    ]

    for (const name of names) {
      await queryRunner.query(
        `INSERT INTO "prognosis" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [uuidv4(), name],
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "prognosis"`)
  }
}
