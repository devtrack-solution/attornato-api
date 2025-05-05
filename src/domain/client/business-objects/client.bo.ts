import { ValidationBuilder } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { Person } from '@/domain/client/component/person/business-objects/person.bo'
import { PersonType } from '@/domain/client/component/person/types/person.type'
import { ClientType } from '@/domain/client/types/client.type'

export interface IClient extends IBusinessObject<ClientType.Input, ClientType.Output> {}

export class Client<TRepository extends ClientType.Input = ClientType.Repository, TOutput extends ClientType.Output = ClientType.Output> extends BaseBusinessObject<TRepository, TOutput> implements IClient {
  protected _groupCustomerId!: string
  protected _profileId!: string
  protected _person!: Person

  protected loadData(data: ClientType.Input): ClientType.Output {
    try {
      this._groupCustomerId = data.groupCustomerId
      this._profileId = data.profileId
      this._person = new Person(data.person)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Client entity`))
    }
    return this.toJson()
  }

  get person(): PersonType.Input {
    return this._person
  }

  constructor(props: ClientType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder
      .of({ value: this._groupCustomerId, fieldName: 'groupCustomerId' })
      .of({ value: this._profileId, fieldName: 'profileId' })
      .of({ value: this._person, fieldName: 'person' })
      .required()
      .build('Failed to validate Client rules')
  }

  toPersistenceObject(): ClientType.Output {
    return {
      id: this._id.toString(),
      groupCustomerId: this._groupCustomerId,
      profileId: this._profileId,
      personId: this._person.id,
      person: this._person.toPersistenceObject(),
    }
  }
}
