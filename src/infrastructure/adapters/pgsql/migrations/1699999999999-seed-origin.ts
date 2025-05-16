import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedOrigin1699999999999 implements MigrationInterface {
  name = 'SeedOrigin1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'BUJARU',
      'D. Betânia',
      'ELANA',
      'Escritório Icoaraci',
      'HELEN',
      'IRITUIA',
      'Mateus',
      'PARAPREVI',
      'SERGIO',
      'SIP',
      'Sr. Jorge',
      'TAILANDIA',
    ]

    for (const name of names) {
      await queryRunner.query(
        `INSERT INTO "origins" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [uuidv4(), name],
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "origins"`)
  }
}
