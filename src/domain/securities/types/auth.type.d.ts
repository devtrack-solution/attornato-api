
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

  export type LoginInput = {
    username: string
    enable?: boolean
  }

}
