// import { BaseBusinessObject, IBusinessObject } from '@/core/domain/business-objects/base.bo'
// import { ValidationBuilder, IValidator } from '@/core/domain/validators'
// import { EntityBadDataLoadException } from '@/core/domain/exceptions'
// import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
// import { AuthType } from '@/domain/securities/types/auth.type'
//
// export interface ILogin extends IBusinessObject<AuthType.LoginInput, AuthType.LoginOutput> {}
//
// export class Login extends BaseBusinessObject<AuthType.LoginInput, AuthType.LoginOutput> implements ILogin, IValidator {
//   private _username!: string
//   private _password!: string
//
//   private loadData(data: AuthType.LoginOutput): this {
//     try {
//       this._username = data.username
//       this._password = data.password ?? ''
//     } catch (e) {
//       throw new EntityBadDataLoadException(new ValidationErrorResponse(`Error loading role entity`))
//     }
//     return this
//   }
//
//   constructor(props: AuthType.LoginInput) {
//     super(props)
//     this.loadData(props)
//     this.validate()
//   }
//
//   get username(): string {
//     return this._username
//   }
//
//   get password(): string {
//     return this._password
//   }
//
//   get enable(): boolean {
//     return this._enable
//   }
//
//   validate(): void {
//     ValidationBuilder.of({ value: this._username, fieldName: 'username' })
//       .required()
//       .of({ value: this._password, fieldName: 'password' })
//       .required()
//       .of({ value: this._enable, fieldName: 'enable' })
//       .build('Failed to validate role rules')
//   }
// }
