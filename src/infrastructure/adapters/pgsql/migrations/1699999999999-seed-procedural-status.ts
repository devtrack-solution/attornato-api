import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedProceduralStatus1699999999999 implements MigrationInterface {
  name = 'SeedProceduralStatus1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const names = ['DEMANDADO', 'DEMANDANTE', 'acusado', 'AGRAVANTE', 'AUTOR', 'Embargado', 'Embargante', 'IMPETRANTE', 'PRO', 'PROTOCOLADO', 'RECLAMADO', 'reclamante', 'REQUERENTE', 'SEGURADO', 'VITIMA']

    for (const name of names) {
      await queryRunner.query(`INSERT INTO "procedural_status" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [uuidv4(), name])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "procedural_status"`)
  }
}
