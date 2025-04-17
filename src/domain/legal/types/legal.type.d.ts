import { BaseType } from '@/core/domain/types/base.type'
import {PersonType} from "@/domain/legal/types/person.type";

export namespace LegalType {
  export type Input = {
    person: PersonType.Input
    groupCustomer: GroupCustomer
    profile: Profile
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
