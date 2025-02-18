export namespace Criteria {
  export type FindBy = {
    search: string
    filterBy?: string[]
    isActive?: boolean
  }
  export type Paginated = FindBy & {
    offset: number
    limit: number
  }
  export type ById = {
    id: string
  }
}
