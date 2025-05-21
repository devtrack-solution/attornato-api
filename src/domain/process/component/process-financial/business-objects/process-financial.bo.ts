import { ValidationBuilder, IValidator } from '@/core/domain/validators'
import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
import { EntityBadDataLoadException } from '@/core/domain/exceptions'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ProcessFinancialType } from '../types/process-financial.type'

export interface IProcessFinancial extends IBusinessObject<ProcessFinancialType.Input, ProcessFinancialType.Output> {}

export class ProcessFinancial extends BaseBusinessObject<ProcessFinancialType.Repository, ProcessFinancialType.Output> implements IProcessFinancial, IValidator {
  private _hiring?: Date
  private _resJudicata?: Date
  private _closure?: Date
  private _sentence?: Date
  private _distribution?: Date
  private _execution?: Date
  private _causeValue?: number
  private _otherValue?: number
  private _contingency?: number

  private loadData(data: ProcessFinancialType.Input): ProcessFinancialType.Output {
    try {
      this._hiring = data.hiring === undefined ? undefined : data.hiring
      this._resJudicata = data.resJudicata === undefined ? undefined : data.resJudicata
      this._closure = data.closure === undefined ? undefined : data.closure
      this._sentence = data.sentence === undefined ? undefined : data.sentence
      this._distribution = data.distribution === undefined ? undefined : data.distribution
      this._execution = data.execution === undefined ? undefined : data.execution
      this._causeValue = data.causeValue === undefined ? undefined : data.causeValue
      this._otherValue = data.otherValue === undefined ? undefined : data.otherValue
      this._contingency = data.contingency === undefined ? undefined : data.contingency
    } catch (e) {
      throw e
    }
    return this.toJson()
  }

  get hiring(): Date | undefined {
    return this._hiring
  }

  get resJudicata(): Date | undefined {
    return this._resJudicata
  }

  get closure(): Date | undefined {
    return this._closure
  }

  get sentence(): Date | undefined {
    return this._sentence
  }

  get distribution(): Date | undefined {
    return this._distribution
  }

  get execution(): Date | undefined {
    return this._execution
  }

  get causeValue(): number | undefined {
    return this._causeValue
  }

  get otherValue(): number | undefined {
    return this._otherValue
  }

  get contingency(): number | undefined {
    return this._contingency
  }

  constructor(props: ProcessFinancialType.Input) {
    super(props)
    this.loadData(props)
    this.validate()
  }

  validate(): void {
    ValidationBuilder.of({ value: this._hiring, fieldName: 'hiring' })
      .of({ value: this._resJudicata, fieldName: 'resJudicata' })
      .of({ value: this._closure, fieldName: 'closure' })
      .of({ value: this._sentence, fieldName: 'sentence' })
      .of({ value: this._distribution, fieldName: 'distribution' })
      .of({ value: this._execution, fieldName: 'execution' })
      .of({ value: this._causeValue, fieldName: 'causeValue' })
      .of({ value: this._otherValue, fieldName: 'otherValue' })
      .of({ value: this._contingency, fieldName: 'contingency' })
      .build('Failed to validate ProcessFinancial rules')
  }

  toPersistenceObject(): ProcessFinancialType.Output {
    return {
      id: this._id.toString(),
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
