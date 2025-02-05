export namespace TodoType {
  export type Input = {
    id?: string
    name: string
    email: string
    age: number
    birthday: Date
    enable: boolean
    height: number
  }

  export type Output = Input

  export type CustomInputUpdate = {
    age: number
    height: number
  }

  export type Repository = Output

  export type Criteria = {
    id: string
  }
}
