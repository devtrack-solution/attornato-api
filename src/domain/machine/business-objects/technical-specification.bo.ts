import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { TechnicalSpecificationType } from '@/domain/machine/types/technical-specification.type'
import { EquipmentCategory } from '@/domain/machine/business-objects/equipment-category.bo'
import { Manual } from '@/domain/machine/business-objects/manual.bo'

export interface ITechnicalSpecification extends IBusinessObject<TechnicalSpecificationType.Input, TechnicalSpecificationType.Output> {}

export class TechnicalSpecification extends BaseBusinessObject<TechnicalSpecificationType.Repository, TechnicalSpecificationType.Output> implements ITechnicalSpecification, IValidator {
  private _manufacturer: string
  private _manufactureYear: number
  private _model?: string
  private _serialNumber?: string
  private _requiredAreaM2?: number
  private _acquisitionAt?: Date
  private _acquisitionValue?: number
  private _depreciatedMarketValue?: number
  private _usefulLife: number
  private _energyConsumption?: number
  /*private _equipmentCategory?: EquipmentCategory*/
  private _manuals?: Manual[]

  constructor(props: TechnicalSpecificationType.Input) {
    super(props)

    this._manufacturer = props.manufacturer
    this._manufactureYear = props.manufactureYear ?? new Date().getFullYear()
    this._model = props.model
    this._serialNumber = props.serialNumber
    this._requiredAreaM2 = props.requiredAreaM2 ?? 0
    this._acquisitionAt = props.acquisitionAt ? new Date(props.acquisitionAt) : undefined
    this._acquisitionValue = props.acquisitionValue ?? 0
    this._depreciatedMarketValue = props.depreciatedMarketValue ?? 0
    this._usefulLife = props.usefulLife ?? 0
    this._energyConsumption = props.energyConsumption ?? 0
    /*this._equipmentCategory = props.equipmentCategory ? new EquipmentCategory(props.equipmentCategory) : undefined*/
    this._manuals = props.manuals ? props.manuals.map((m) => new Manual(m)) : undefined

    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._manufacturer, fieldName: 'manufacturer' })
      .required()
      .of({ value: this._manufactureYear, fieldName: 'manufactureYear' })
      .required()
      .of({ value: this._acquisitionValue, fieldName: 'acquisitionValue' })
      .required()
      .of({ value: this._usefulLife, fieldName: 'usefulLife' })
      .required()
      .build('Failed to validate Technical Specification rules')
  }

  toPersistenceObject(): TechnicalSpecificationType.Output {
    return {
      manufacturer: this._manufacturer,
      manufactureYear: this._manufactureYear,
      model: this._model,
      serialNumber: this._serialNumber,
      requiredAreaM2: this._requiredAreaM2,
      acquisitionAt: this._acquisitionAt,
      acquisitionValue: this._acquisitionValue,
      depreciatedMarketValue: this._depreciatedMarketValue,
      usefulLife: this._usefulLife,
      energyConsumption: this._energyConsumption,
      /*equipmentCategory: this._equipmentCategory?.toPersistence(),*/
      manuals: this._manuals ? this._manuals.map((m) => m.toPersistence()) : undefined,
    }
  }
}
