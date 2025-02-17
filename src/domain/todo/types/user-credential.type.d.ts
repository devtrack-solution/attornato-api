import { BaseType } from '@/core/domain/types/base.type'

export namespace UserCredentialType {
  export type Input = {
    passwordHash?: string
    lastLogin?: Date
    expiredAt?: Date
    resetPasswordToken?: string
    resetPasswordCode?: string
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output

  export type Criteria =
    | {
        id: string
      }
    | undefined
}
