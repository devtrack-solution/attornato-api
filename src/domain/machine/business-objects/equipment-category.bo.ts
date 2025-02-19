import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { EquipmentCategoryType } from '@/domain/machine/types/equipment-category.type'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'


export interface IEquipmentCategory extends IBusinessObject<EquipmentCategoryType.Input, EquipmentCategoryType.Output> {}

export class EquipmentCategory extends BaseBusinessObject<EquipmentCategoryType.Repository, EquipmentCategoryType.Output> implements IEquipmentCategory, IValidator {
  private _name!: string
  private _description!: string
  private _alias!: string

  private loadData(data: EquipmentCategoryType.Input): EquipmentCategoryType.Output {
    try {
      this._name = data.name
      this._description = data.description
      this._alias = data.alias
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Machine entity`))
    }
    return this.toJson()
  }

  constructor(props: EquipmentCategoryType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).required()
      .of({ value: this._alias, fieldName: 'alias' }).required()
      .build('Failed to validate Equipment Category rules')
  }

  toPersistenceObject(): EquipmentCategoryType.Output {
    return {
      name: this._name,
      description: this._description,
      alias: this._alias,
    }
  }
}
