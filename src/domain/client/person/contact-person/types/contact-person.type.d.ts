import { BaseType } from '@/core/domain/types/base.type'
import { FreeFieldType } from '@/domain/client/person/contact-person/free-field/types/free-field.type'
import { Column } from 'typeorm'

export namespace ContactPersonType {
  export type Input = {
    freeFieldOne: string
    note: string
    freeField: FreeFieldType.Input
    mobilePhone?: string
    phoneNumber?: string
    fatherName?: string
    motherName?: string
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
