import { BaseType } from '@/core/domain/types/base.type'
import { UserCredentialType } from '@/domain/types/credential.type.d.ts'
import { RoleType } from '@/domain/types/role.type.d.ts'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  DISABLED = 'DISABLED',
}

export namespace UserType {
  export type Input = {
    username: string
    email: string
    status: UserStatus
    userCredential: UserCredentialType.Input
    roles: RoleType.Input[]
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output

  export type Criteria =
    | {
        id: string
      }
    | undefined
}
