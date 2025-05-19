import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'

export interface IProfile extends IBusinessObject<ProfileType.Input, ProfileType.Output> {}

export class Profile extends BaseBusinessObject<ProfileType.Repository, ProfileType.Output> implements IProfile, IValidator {
  private _name!: string

  private loadData(data: ProfileType.Input): ProfileType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Profile entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: ProfileType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).build('Failed to validate Profile rules')
  }

  toPersistenceObject(): ProfileType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
