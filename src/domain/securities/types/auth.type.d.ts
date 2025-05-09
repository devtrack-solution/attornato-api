
export namespace AuthType {
  export type LoginOutput = {
    username: string
    password?: string
    enable?: boolean
  }

  export type LoginInput = {
    username: string
    enable?: boolean
  }

}
