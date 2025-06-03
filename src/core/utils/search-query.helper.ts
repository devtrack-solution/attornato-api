import { Brackets, ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export class SearchQueryHelper {
  constructor(
    private readonly dbType: 'mysql' | 'postgres',
    private readonly aliasHelper: {
      getColumnPath: (field: string) => string
    }
  ) {}

  applySearch<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    searchTerm: string,
    fields: string[],
    paramName = 'search'
  ) {
    if (!searchTerm || !fields.length) return

    const isPostgres = this.dbType === 'postgres'
    const likeOperator = isPostgres ? 'ILIKE' : 'LIKE'

    const castFields = ['created_at', 'updated_at', 'deleted_at'] // campos que precisam de CAST no PostgreSQL

    qb.andWhere(
      new Brackets((qb1) => {
        for (const field of fields) {
          const [relationAlias, rawField] = field.includes('.')
            ? field.split('.')
            : [undefined, field]

          const fieldPath = this.aliasHelper.getColumnPath(field)

          const useCast = isPostgres && castFields.includes(rawField)

          const expression = useCast
            ? `LOWER(CAST(${fieldPath} AS TEXT)) ${likeOperator} LOWER(:${paramName})`
            : `LOWER(${fieldPath}) ${likeOperator} LOWER(:${paramName})`

          qb1.orWhere(expression, {
            [paramName]: `%${searchTerm}%`,
          })
        }
      })
    )
  }
}
