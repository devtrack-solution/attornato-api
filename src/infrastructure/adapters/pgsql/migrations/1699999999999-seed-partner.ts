import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedPartner1699999999999 implements MigrationInterface {
  name = 'SeedPartner1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = ['BETANIA', 'BRUNA', 'DRA HELLEN', 'DRA. MARY', 'DR. CELSO', 'DR. SERGIO', 'ELANA', 'HELEN', 'Mary', 'PAULO', 'SR. JORGE', 'SR. MATEUS']

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "partners" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "partners"`)
  }
}
