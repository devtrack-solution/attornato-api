import { SelectQueryBuilder } from 'typeorm'
import { QueryAliasHelper } from './query-alias.helper'

export class RelationQueryHelper {
    constructor(private readonly aliasHelper: QueryAliasHelper) {}

  applyRelations(qb: SelectQueryBuilder<any>, rootAlias: string, relations: string[]) {
    const aliasMap = new Map<string, string>()
    aliasMap.set('', rootAlias) // base

    for (const relationPath of relations) {
      const parts = relationPath.split('.') // ex: ['processDetail', 'detail']
      let path = ''
      let previousAlias = rootAlias

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i]
        path = path ? `${path}.${part}` : part
        const currentAlias = path.replace(/\./g, '_')

        if (!aliasMap.has(path)) {
          qb.leftJoinAndSelect(`${previousAlias}.${part}`, currentAlias)
          aliasMap.set(path, currentAlias)
        }

        previousAlias = currentAlias
      }
    }
  }

}
