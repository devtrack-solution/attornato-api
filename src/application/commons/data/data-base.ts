export abstract class DataBase {
  createdAt?: Date

  updatedAt?: Date
}

export abstract class BasicResult {
  count!: number

  limit!: number

  offset!: number
}
