import { BaseType } from '@/core/domain/types/base.type'
import { PermissionType } from '@/domain/types/permission.type.d.ts'

export namespace RoleType {
  export type Input = {
    id?: string
    name: string
    description?: string
    level: number
    permissionIds?: string[]
    permissions?: PermissionType.Input[]
  } & BaseType.Input

  export type Output = Input

  export type OutputPaginated = {
    count: number
    limit: number
    offset: number
    data: Partial<Output[]>
  }

  export type Repository = Output

  export type RepositoryPaginated = OutputPaginated
}
