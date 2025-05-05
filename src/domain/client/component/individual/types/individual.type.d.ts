import { ClientType } from '@/domain/client/types/client.type'

export namespace IndividualType {
  export type Input = {
    name: string
    nationality: string
    occupation: string
    educationLevel: string
    maritalStatus: string
    birthDate: Date
    cpf: string
    rg: string
    pis: string
  } & ClientType.Input

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
