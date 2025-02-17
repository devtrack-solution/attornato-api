export namespace BaseType {
  export type Input = {
    id?: string
    userId?: string
    lastUpdatedUserId?: string
    createdUserId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    enable?: boolean
  }

  export type Output = {
    id?: string
    lastUpdatedUserId?: string
    createdUserId?: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
    enable?: boolean
  }
}
