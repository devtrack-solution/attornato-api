import { BaseType } from '@/core/domain/types/base.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export namespace CredentialType {
  export type Input = {
    username: string
    password?: string
    passwordHash?: string
    lastLogin?: Date | any
    expiredAt?: Date | any
    resetPasswordToken?: string | any
    requestNewPassword?: boolean
    resetPasswordCode?: string | any
    roles?: RoleType.Input[] | [] | any
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output

  export type Persistence = {
    id?: string
    username: string
    lastLogin: Date | null
    passwordHash: any
    requestNewPassword?: boolean
    expiredAt: Date | null
    resetPasswordToken: string | any
    resetPasswordCode: string | any
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
