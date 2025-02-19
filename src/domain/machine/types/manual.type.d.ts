import { BaseType } from '@/core/domain/types/base.type'

export namespace ManualType {
  export type Input = {
    link: string
    description: string
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output
}
