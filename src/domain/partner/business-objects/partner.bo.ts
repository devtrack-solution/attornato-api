import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { PartnerType } from '@/domain/partner/types/partner.type'

export interface IPartner extends IBusinessObject<PartnerType.Input, PartnerType.Output> {}

export class Partner extends BaseBusinessObject<PartnerType.Repository, PartnerType.Output> implements IPartner, IValidator {
  private _name!: string

  private loadData(data: PartnerType.Input): PartnerType.Output {
    try {
      this._name = data.name
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Partner entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: PartnerType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' })
      .required()
      .build('Failed to validate Partner rules')
  }

  toPersistenceObject(): PartnerType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
