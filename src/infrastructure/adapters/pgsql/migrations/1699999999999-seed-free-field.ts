import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedFreeField1699999999999 implements MigrationInterface {
  name = 'SeedFreeField1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const freeFieldNames = [
      'AMANDA', 'BETANIA', 'DANIELA', 'DIGISAC', 'EDINHO', 'ELANA', 'ELANE', 'ELEM',
      'ESCR.SÃO MIGUEL', 'ESCR.TOME AÇÚ', 'FILIAL 2', 'HELEN', 'HELEN E BETANIA',
      'ICOARACI', 'IRITUIA', 'JEIZIENNE', 'JORGE', 'JOZI', 'JULIANA', 'LAIS', 'LANDIN',
      'MARCO', 'MARY', 'MATEUS', 'PAULO', 'SAO DOMINGO DO CAPIM', 'SAO MIGUEL', 'SARA',
      'SERGIO', 'SIP', 'SORAYA', 'VITORIA', 'WOSGHITON'
    ]

    for (const name of freeFieldNames) {
      await queryRunner.query(
        `INSERT INTO "free-fields" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [uuidv4(), name]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "free-fields"`)
  }
}
