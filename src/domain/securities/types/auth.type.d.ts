
export namespace AuthType {
  export type LoginOutput = {
    username: string
    password?: string
    enable?: boolean
  }

  export type Onboarding = {
    accountId: string
    roleId: string
  }

  export type Token = {
    token: string
  }

  export type LoginInput = {
    username: string
    enable?: boolean
  }


  export type ForgotPasswordOutput = {
    username: string
  }

  export type ResetPasswordInput = {
    username?: string
    forgotCode: string
    password: string
    passwordConfirm: string
  }

  export type ResetPasswordOutput = {} & ResetPasswordInput
}
