import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { CommunicationChannelType } from '@/domain/client/component/person/communication-address/contact/communication-channel/types/communication-channel.type'

export interface ICommunicationChannel extends IBusinessObject<CommunicationChannelType.Input, CommunicationChannelType.Output> {}

export class CommunicationChannel extends BaseBusinessObject<CommunicationChannelType.Repository, CommunicationChannelType.Output> implements ICommunicationChannel, IValidator {
  private _name!: string

  private loadData(data: CommunicationChannelType.Input): CommunicationChannelType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading CommunicationChannel entity`))
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: CommunicationChannelType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({
      value: this._name,
      fieldName: 'name',
    }).build('Failed to validate CommunicationChannel rules')
  }

  toPersistenceObject(): CommunicationChannelType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
