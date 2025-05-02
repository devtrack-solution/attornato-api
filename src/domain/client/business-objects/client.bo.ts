import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { GroupCustomer } from '@/domain/client/component/group-customer/business-objects/group-customer.bo'
import { Person } from '@/domain/client/component/person/business-objects/person.bo'
import { PersonType } from '@/domain/client/component/person/types/person.type'
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { Profile } from '@/domain/client/component/profile/business-objects/profile.bo'
import { ClientType } from '@/domain/client/types/client.type'

export interface IClient extends IBusinessObject<ClientType.Input, ClientType.Output> {}

export class Client extends BaseBusinessObject<ClientType.Repository, ClientType.Output> implements IClient, IValidator {
  private _groupCustomer!: GroupCustomer
  private _profile!: Profile
  private _person!: Person

  private loadData(data: ClientType.Input): ClientType.Output {
    try {
      this._groupCustomer = GroupCustomer.fromReference(data.groupCustomer)
      this._profile = Profile.fromReference(data.profile)
      this._person = new Person(data.person)
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading Client entity`))
    }
    return this.toJson()
  }

  get person(): PersonType.Input {
    return this._person
  }

  get groupCustomer(): GroupCustomerType.Input {
    return this._groupCustomer
  }

  get profile(): ProfileType.Input {
    return this._profile
  }

  constructor(props: ClientType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }


  static fromReference(data: any ): Client {
    const instance = Object.create(Client.prototype)
    instance._id = data.id
    return instance as Client
  }

  validate(): void {
    ValidationBuilder
      .of({ value: this._groupCustomer, fieldName: 'groupCustomer' })
      .of({ value: this._profile, fieldName: 'profile' })
      .of({ value: this._person, fieldName: 'person' })
      .build('Failed to validate Client rules')
  }

  toPersistenceObject(): ClientType.Output {
    return {
      id: this._id.toString(),
      groupCustomer: { id: this._groupCustomer.id },
      profile: { id: this._profile.id },
      person: this._person.toPersistenceObject(),
    }
  }
}
