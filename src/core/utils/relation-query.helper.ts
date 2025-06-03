import { QueryAliasHelper } from '@/core/utils/query-alias.helper'
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm'

export class RelationQueryHelper {
  constructor(private readonly aliasHelper: QueryAliasHelper) {}

  applyRelations<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    relations: string[]
  ) {
    relations.forEach((relation) => {
      const parts = relation.split('.')
      let path = alias
      parts.forEach((_, i) => {
        const subPath = parts.slice(0, i + 1).join('.')
        const joinPath = `${path}.${parts[i]}`
        const joinAlias = this.aliasHelper.getJoinAlias(subPath)
        if (!qb.expressionMap.joinAttributes.find((j) => j.alias?.name === joinAlias)) {
          qb.leftJoinAndSelect(joinPath, joinAlias)
        }
        path = joinAlias
      })
    })
  }
}
