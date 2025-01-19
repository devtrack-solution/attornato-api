export namespace TodoTypes {
  export type Input = {
    id?: string
    name: string
    age: number
    birthday: Date
    isActive: boolean
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
