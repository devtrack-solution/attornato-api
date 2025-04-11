import { BaseType } from '@/core/domain/types/base.type'

export namespace LegalDataType {
  export type Input = {
    clientId: string
    groupCustomer: GroupCustomer.Input
    profile: Profile.Input
    responsable: string
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
