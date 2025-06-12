import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { HashUtil } from '@/core/utils/hash.util'

export default class CreateDemoAccounts1699999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [
      { name: 'Laércio', email: 'laercio@devtrack.com.br' },
      { name: 'Wilton', email: 'wilton@devtrack.com.br' },
      { name: 'Anderson', email: 'anderson@devtrack.com.br' },
      { name: 'Marcio', email: 'marciolandin@gmail.com' },
    ]

    const passwordHash = HashUtil.generateHash('123456')

    // Busca os IDs das roles ADMINISTRATOR e COLLABORATOR
    const rolesResult = await queryRunner.query(`
      SELECT id, name FROM roles WHERE name IN ('ADMINISTRATOR', 'COLLABORATOR')
    `)

    const roleMap: Record<string, string> = {}
    for (const role of rolesResult) {
      roleMap[role.name] = role.id
    }

    for (const user of users) {
      const accountPersonId = uuidv4()
      const credentialId = uuidv4()
      const accountId = uuidv4()

      // 1. Account Person
      await queryRunner.query(`INSERT INTO "account_persons" ("id", "name", "birthday") VALUES ($1, $2, $3)`, [accountPersonId, user.name, new Date('1990-01-01')])

      // 2. Credential
      await queryRunner.query(`INSERT INTO "credentials" ("id", "username", "password_hash", "request_change_password") VALUES ($1, $2, $3, $4)`, [credentialId, user.email, passwordHash, false])

      // 3. Account
      await queryRunner.query(`INSERT INTO "accounts" ("id", "accountPersonId", "credentialId") VALUES ($1, $2, $3)`, [accountId, accountPersonId, credentialId])

      // 4. Relacionar com roles (ADMINISTRATOR e COLLABORATOR)
      for (const roleName of ['ADMINISTRATOR', 'COLLABORATOR']) {
        const roleId = roleMap[roleName]
        if (roleId) {
          await queryRunner.query(`INSERT INTO "credential_role" ("id_credential", "id_role") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [credentialId, roleId])
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const emails = ['laercio@devtrack.com.br', 'wilton@devtrack.com.br', 'anderson@devtrack.com.br']

    for (const email of emails) {
      await queryRunner.query(
        `
        DELETE FROM "credential_role"
        WHERE "id_credential" IN (SELECT "id" FROM "credentials" WHERE "username" = $1)
      `,
        [email],
      )

      await queryRunner.query(
        `
        DELETE FROM "accounts"
        WHERE "credentialId" IN (SELECT "id" FROM "credentials" WHERE "username" = $1)
      `,
        [email],
      )

      await queryRunner.query(
        `
        DELETE FROM "credentials"
        WHERE "username" = $1
      `,
        [email],
      )

      await queryRunner.query(
        `
        DELETE FROM "account_persons"
        WHERE "name" ILIKE $1
      `,
        [email.split('@')[0]],
      )
    }
  }
}
