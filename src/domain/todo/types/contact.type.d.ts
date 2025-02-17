import { BaseType } from '@/core/domain/types/base.type'

export namespace ContactType {
  export type Input = {
    contactType: string
    name: string
    value: string
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output

  export type Criteria =
    | {
        id: string
      }
    | undefined
}
