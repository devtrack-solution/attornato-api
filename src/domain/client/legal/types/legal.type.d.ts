import { BaseType } from '@/core/domain/types/base.type'
import { GroupCustomerType } from '@/domain/client/group-customer/types/group-customer.type'
import { PersonType } from '@/domain/client/person/types/person.type'
import { ProfileType } from '@/domain/client/profile/types/profile.type'

export namespace LegalType {
  export type Input = {
    person: PersonType.Input
    groupCustomer: GroupCustomerType.Input
    profile: ProfileType.Input
    responsible: string
    companyName: string
    tradeName: string
    businessArea: string
    cnpj: string
    stateRegistration: string
    municipalRegistration: string
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
