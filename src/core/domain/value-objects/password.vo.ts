import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { HashUtil } from '@/core/utils/hash.util'
import { IValidator, ValidationBuilder } from '@/core/domain/validators'

const config = new ConfigEnvironmentService()

export class PasswordVo implements IValidator {
  private readonly _hash: string
  private readonly _value: string
  private static customRegex: RegExp = config.password.regex

  constructor(value: string | number | any) {
    this._value = String(value)
    this._hash = this.create()
  }

  private create(): string {
    this.validate()
    return HashUtil.generateHash(this._value)
  }

  public get value(): string {
    return this._hash!
  }

  public toString(): string {
    return this._hash!
  }

  public static setValidationRegex(regex: RegExp): void {
    PasswordVo.customRegex = regex
  }

  public async compare(plain: string): Promise<boolean> {
    return HashUtil.compareHash(plain, this._hash!)
  }

  validate(): void {
    ValidationBuilder.of({ value: this._value, fieldName: 'value' })
      .min(config.password.minLength)
      .max(config.password.maxLength)
      .regex(PasswordVo.customRegex)
      .required()
      .build('Failed to validate password rules')
  }
}
