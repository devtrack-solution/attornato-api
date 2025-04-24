import { BaseType } from '@/core/domain/types/base.type'
import { GroupCustomerType } from '@/domain/group-customer/types/group-customer.type'
import { ProfileType } from '@/domain/profile/types/profile.type'
import { PersonType } from '@/domain/client/individual/person/types/person.type'

export namespace IndividualType {
  export type Input = {
    person: PersonType.Input
    groupCustomer: GroupCustomerType.Input
    profile: ProfileType.Input
    name: string
    nationality: string
    occupation: string
    educationLevel: string
    maritalStatus: string
    birthDate: Date
    cpf: string
    rg: string
    pis: string
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
