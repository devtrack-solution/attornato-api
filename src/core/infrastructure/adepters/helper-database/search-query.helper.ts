import { SelectQueryBuilder } from 'typeorm'
import { QueryAliasHelper } from './query-alias.helper'

export class SearchQueryHelper {
  constructor(private readonly aliasHelper: QueryAliasHelper) {}

  applySearch(qb: SelectQueryBuilder<any>, search: string, fields: string[]): void {
    const searchConditions = fields.map(field => {
      const column = this.aliasHelper.getColumnPath(field)
      const param = field.replace(/\./g, '_')
      return `${column} LIKE :${param}`
    })

    const parameters = Object.fromEntries(
      fields.map(field => [field.replace(/\./g, '_'), `%${search}%`])
    )

    qb.andWhere(`(${searchConditions.join(' OR ')})`, parameters)
  }
}
