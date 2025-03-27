import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProceduralStatusType } from '@/domain/procedural-status/types/procedural-status.type'

export interface IProceduralStatus extends IBusinessObject<ProceduralStatusType.Input, ProceduralStatusType.Output> {}

export class ProceduralStatus extends BaseBusinessObject<ProceduralStatusType.Repository, ProceduralStatusType.Output> implements IProceduralStatus, IValidator {
  private _name!: string

  private loadData(data: ProceduralStatusType.Input): ProceduralStatusType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading ProceduralStatus entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: ProceduralStatusType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate ProceduralStatus rules')
  }

  toPersistenceObject(): ProceduralStatusType.Output {
    return {
      name: this._name,
    }
  }
}
