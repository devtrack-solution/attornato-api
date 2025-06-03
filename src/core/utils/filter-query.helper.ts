import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export class FilterQueryHelper {
  constructor(
    private readonly aliasHelper: {
      getColumnPath: (field: string) => string
    },
    private readonly columnMap: Record<string, string>,
  ) {}

  applyFilters<T extends ObjectLiteral>(qb: SelectQueryBuilder<T>, filters: Record<string, any>, alias: string) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null) return

      const [fieldPath, operator] = key.split('_')
      const parts = fieldPath.split('.')
      const rawField = parts.pop()!
      const relationAlias = parts.length ? parts.join('.') : alias
      const dbField = this.columnMap[rawField] || rawField
      const path = this.aliasHelper.getColumnPath(`${relationAlias}.${dbField}`)
      const param = `${relationAlias}_${dbField}_${operator ?? 'eq'}`

      const clauseMap = {
        from: `${path} >= :${param}`,
        to: `${path} <= :${param}`,
        like: `LOWER(${path}) LIKE LOWER(:${param})`,
        eq: `${path} = :${param}`,
      } as const

      type Operator = keyof typeof clauseMap
      const op = (operator ?? 'eq') as Operator

      qb.andWhere(clauseMap[op], { [param]: value })
    })
  }
}
