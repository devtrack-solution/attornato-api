import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedResponsible1699999999999 implements MigrationInterface {
  name = 'SeedResponsible1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = [
      'BÁRBARA',
      'CELSO OLIVEIRA',
      'CLARA',
      'CRISTIANE',
      'CYND',
      'DACILVANIA',
      'DAYANE',
      'DEBORAH',
      'ELIS',
      'HELEN',
      'HIROSHI',
      'JESSICA',
      'LANDIN',
      'LETICIA',
      'MARCOS',
      'NEUZA',
      'PAULA',
      'RAIZA',
      'ROBERT',
      'SÔNIA',
      'Stefany',
      'VITORIA',
      'WILTON',
    ]

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "responsibles" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "responsibles"`)
  }
}
