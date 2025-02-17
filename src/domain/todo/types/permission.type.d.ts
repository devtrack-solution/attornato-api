import { BaseType } from '@/core/domain/types/base.type'

export namespace PermissionType {
  export type Input = {
    name: string
    description: string
    resource: string
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output
}
