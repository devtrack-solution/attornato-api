import { SelectQueryBuilder } from 'typeorm'
import { QueryAliasHelper } from './query-alias.helper'
import { DataBase } from '@/core/domain/types/database.type'

export class FilterQueryHelper {
    constructor(private readonly aliasHelper: QueryAliasHelper) {}

    applyFilters(
      qb: SelectQueryBuilder<any>,
      filters: DataBase.Filters[] = [],
    ): void {
        for (const { field, operator = '=', value } of filters) {
            const param = field.replace(/\./g, '_')
            const column = this.aliasHelper.getColumnPath(field)

            switch (operator) {
                case 'LIKE':
                    qb.andWhere(`${column} LIKE :${param}`, { [param]: `%${value}%` })
                    break
                case 'IN':
                    qb.andWhere(`${column} IN (:...${param})`, { [param]: value })
                    break
                default:
                    qb.andWhere(`${column} ${operator} :${param}`, { [param]: value })
            }
        }
    }
}
