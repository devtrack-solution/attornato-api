export namespace DataBase {
  export type ManyToManyObject = {
    field: string          // nome da propriedade no entity (ex: "tags")
    entityName: string     // nome da entidade para o TypeORM (ex: "TagEntity")
    ids: string[]          // lista de IDs relacionados
  }
}
