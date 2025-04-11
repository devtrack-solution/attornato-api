export namespace Criteria {
  export type FindBy = {
    search: string
    isActive?: boolean
  }
  export type Paginated = FindBy & {
    offset: number
    limit: number
  }
  export type ById = {
    id: string
  }
  export type ByChildren = {
    parentId: string
    childrenId: string
  }
}
