import { BaseType } from '@/core/domain/types/base.type'
import { EquipmentCategoryType } from '@/domain/types/equipment-category.type.d.ts'
import { ManualType } from '@/domain/types/manual.type.d.ts'

export namespace TechnicalSpecificationType {
  export type Input = {
    manufacturer: string
    manufactureYear: number
    model?: string
    serialNumber?: string
    requiredAreaM2?: number
    acquisitionAt?: Date
    acquisitionValue?: number
    depreciatedMarketValue?: number
    usefulLife: number
    energyConsumption?: number
    /*equipmentCategory?: EquipmentCategoryType.Input*/
    manuals?: ManualType.Input[]
  } & BaseType.Input

  export type Output = Input

  export type Repository = Output
}
