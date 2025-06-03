import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { QueryAliasHelper } from '@/core/utils/query-alias.helper'

export class SelectQueryHelper {
  constructor(private readonly aliasHelper: QueryAliasHelper) {}

  applySelect<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    select: string[]
  ) {
    if (!select.length) return

    const alreadySelected = new Set<string>()
    qb.select(
      select
        .map((field) => {
          const path = this.aliasHelper.getColumnPath(field)
          const asAlias = this.aliasHelper.getSelectAlias(field)
          if (alreadySelected.has(asAlias)) return null
          alreadySelected.add(asAlias)
          return `${path} AS ${asAlias}`
        })
        .filter((v): v is string => !!v),
    )
  }
}
