import { BaseType } from '@/core/domain/types/base.type'
import { Criteria } from '@/core/domain/types/criteria.type'
import { RoleType } from '@/domain/securities/types/role.type'

export namespace CredentialType {
  export type Input = {
    username: string
    password?: string
    passwordHash?: string
    lastLogin?: Date | any
    expiredAt?: Date | any
    expiredCodeAt?: Date | any
    resetPasswordToken?: string | any
    requestNewPassword?: boolean
    resetPasswordCode?: string | any
    roles?: RoleType.Input[] | [] | any
    roleIds?: string[]
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output

  export type Persistence = {
    id?: string
    username: string
    roles: RoleType.Input[]
  }

  export type PersistenceRole = {
    credentialId: string
    roleId: string
  }

  export type Criteria =
    | {
        id: string
      }
    | undefined

  export type FindBy = Criteria.FindBy
}
