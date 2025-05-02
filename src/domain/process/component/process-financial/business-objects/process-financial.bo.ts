import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProcessFinancialType } from '../types/process-financial.type'

export interface IProcessFinancial extends IBusinessObject<ProcessFinancialType.Input, ProcessFinancialType.Output> {}

export class ProcessFinancial extends BaseBusinessObject<ProcessFinancialType.Repository, ProcessFinancialType.Output> implements IProcessFinancial, IValidator {
  private _hiring!: Date
  private _resJudicata!: Date
  private _closure!: Date
  private _sentence!: Date
  private _distribution!: Date
  private _execution!: Date
  private _causeValue!: number
  private _otherValue!: number
  private _contingency!: number

  private loadData(data: ProcessFinancialType.Input): ProcessFinancialType.Output {
    try {
      this._hiring = data.hiring
      this._resJudicata = data.resJudicata
      this._closure = data.closure
      this._sentence = data.sentence
      this._distribution = data.distribution
      this._execution = data.execution
      this._causeValue = data.causeValue
      this._otherValue = data.otherValue
      this._contingency = data.contingency
    } catch (e) {
      throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading ProcessFinancial entity`))
    }
    return this.toJson()
  }

  get hiring(): Date {
    return this._hiring
  }

  get resJudicata(): Date {
    return this._resJudicata
  }

  get closure(): Date {
    return this._closure
  }

  get sentence(): Date {
    return this._sentence
  }

  get distribution(): Date {
    return this._distribution
  }

  get execution(): Date {
    return this._execution
  }

  get causeValue(): number {
    return this._causeValue
  }

  get otherValue(): number {
    return this._otherValue
  }

  get contingency(): number {
    return this._contingency
  }

  constructor(props: ProcessFinancialType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._hiring, fieldName: 'hiring' })
      .required()
      .of({ value: this._resJudicata, fieldName: 'resJudicata' })
      .required()
      .of({ value: this._closure, fieldName: 'closure' })
      .required()
      .of({ value: this._sentence, fieldName: 'sentence' })
      .required()
      .of({ value: this._distribution, fieldName: 'distribution' })
      .required()
      .of({ value: this._execution, fieldName: 'execution' })
      .required()
      .of({ value: this._causeValue, fieldName: 'causeValue' })
      .required()
      .of({ value: this._otherValue, fieldName: 'otherValue' })
      .required()
      .of({ value: this._contingency, fieldName: 'contingency' })
      .required()
      .build('Failed to validate ProcessFinancial rules')
  }

  toPersistenceObject(): ProcessFinancialType.Output {
    return {
      hiring: this._hiring,
      resJudicata: this._resJudicata,
      closure: this._closure,
      sentence: this._sentence,
      distribution: this._distribution,
      execution: this._execution,
      causeValue: this._causeValue,
      otherValue: this._otherValue,
      contingency: this._contingency,
    }
  }
}
