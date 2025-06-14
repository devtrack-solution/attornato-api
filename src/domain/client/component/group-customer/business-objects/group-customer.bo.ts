import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { GroupCustomerType } from '@/domain/client/component/group-customer/types/group-customer.type'

export interface IGroupCustomer extends IBusinessObject<GroupCustomerType.Input, GroupCustomerType.Output> {}

export class GroupCustomer extends BaseBusinessObject<GroupCustomerType.Repository, GroupCustomerType.Output> implements IGroupCustomer, IValidator {
  private _name!: string

  private loadData(data: GroupCustomerType.Input): GroupCustomerType.Output {
    try {
      this._name = data.name ?? ''
    } catch (e) {
      throw e
    }
    return this.toJson()
  }

  get name(): string {
    return this._name
  }

  constructor(props: GroupCustomerType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._name, fieldName: 'name' }).build('Failed to validate GroupCustomer rules')
  }

  toPersistenceObject(): GroupCustomerType.Output {
    return {
      id: this._id.toString(),
      name: this._name,
    }
  }
}
