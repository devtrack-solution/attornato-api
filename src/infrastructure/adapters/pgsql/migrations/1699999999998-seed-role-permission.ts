import { MigrationInterface, QueryRunner } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { rolePermissions } from '@/infrastructure/adapters/pgsql/seed/role-permissions'
import { permissions } from '@/infrastructure/adapters/pgsql/seed/permissions'
import { roles } from '@/infrastructure/adapters/pgsql/seed/roles'

export default class SeedRolePermission1699999999998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const insertedPermissions: Record<string, string> = {}

    // Inserir permissões
    for (const perm of permissions) {
      const id = uuidv4()
      insertedPermissions[perm.name] = id

      await queryRunner.query(`INSERT INTO "permissions" ("id", "name", "description", "resource") VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, [id, perm.name, perm.description, perm.resource])
    }

    // Inserir roles e relacionar com permissões
    for (const role of roles) {
      const roleId = uuidv4()

      await queryRunner.query(`INSERT INTO "roles" ("id", "name", "description", "level") VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, [roleId, role.name, role.description, role.level])

      const permissionNames = rolePermissions[role.name as keyof typeof rolePermissions] || []
      for (const permName of permissionNames) {
        const permId = insertedPermissions[permName]
        if (permId) {
          await queryRunner.query(`INSERT INTO "role_permission" ("id_role", "id_permission") VALUES ($1, $2) ON CONFLICT DO NOTHING`, [roleId, permId])
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "role_permission"`)
    await queryRunner.query(`DELETE FROM "roles" WHERE "name" IN ('ADMINISTRATOR', 'COLLABORATOR')`)
    await queryRunner.query(`DELETE FROM "permissions" WHERE "resource" IN ('CLIENT', 'PROCESS')`)
  }
}
