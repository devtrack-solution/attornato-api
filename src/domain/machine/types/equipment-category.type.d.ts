import { BaseType } from '@/core/domain/types/base.type'

export namespace EquipmentCategoryType {
  export type Input = {
    name: string
    description: string
    alias: string
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output
}
