import { BaseType } from '@/core/domain/types/base.type'
import { PermissionType } from '@/domain/types/permission.type.d.ts'

export namespace RoleType {
  export type Input = {
    name: string
    description: string
    level: number
    permissions: PermissionType.Input[]
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output

  export type Criteria =
    | {
        id: string
      }
    | undefined
}
