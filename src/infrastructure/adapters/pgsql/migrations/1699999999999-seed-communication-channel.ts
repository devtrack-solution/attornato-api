import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

export default class SeedCommunicationChannel1699999999999 implements MigrationInterface {
  name = 'SeedCommunicationChannel1699999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const communicationChannelNames = [
      'Telefone', 'E-mail', 'Celular', 'Instagram', 'Skype'
    ]

    for (const name of communicationChannelNames) {
      await queryRunner.query(
        `INSERT INTO "communication_channel" ("id", "name") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [uuidv4(), name]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "communication_channel"`)
  }
}
