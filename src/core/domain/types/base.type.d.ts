import { RoleType } from '@/domain/securities/types/role.type'
import { PreferenceType } from '@/domain/account/component/preference/types/preference.type'

export namespace BaseType {
  export type Input = {
    id?: string
    userId?: string
    lastUpdatedUserId?: string
    createdUserId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    enable?: boolean
  }

  export type Output = {
    id?: string
    lastUpdatedUserId?: string
    createdUserId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    enable?: boolean
  }

  export type ProfileInput = {
    accountId: string
    name: string
    email: string
    avatar: string
    role: RoleType.Input
    preferences: PreferenceType.Input[]
  }

  export type ProfileOutput = {
    accountId: string
    roles: RoleType.Input[]
  }
}
