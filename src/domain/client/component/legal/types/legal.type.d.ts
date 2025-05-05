import { ClientType } from '@/domain/client/types/client.type'

export namespace LegalType {
  export type Input = {
    responsible: string
    companyName: string
    tradeName: string
    businessArea: string
    cnpj: string
    stateRegistration: string
    municipalRegistration: string
  } & ClientType

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
