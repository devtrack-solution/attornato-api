import { QueryAliasHelper } from './query-alias.helper'

/**
 * Normaliza os campos de select, incluindo automaticamente os campos de ordenação.
 * @param selectField Campos informados manualmente (ex: ['id', 'title'] ou ['entity.id']).
 * @param order Campos usados em ordenação (ex: { createdAt: 'ASC' }).
 * @param aliasHelper Utilitário para montar os aliases.
 * @returns Lista de campos únicos no formato correto para o TypeORM SelectQueryBuilder.
 */
export function normalizeSelectFields(
    selectField: string[],
    order: Record<string, string>,
    aliasHelper: QueryAliasHelper,
): string[] {
    const selectSet = new Set<string>()

    for (const field of selectField) {
        const normalized = field.includes('.') ? field : aliasHelper.getColumnPath(field)
        selectSet.add(normalized)
    }

    for (const orderField of Object.keys(order)) {
        const normalized = aliasHelper.getColumnPath(orderField)
        selectSet.add(normalized)
    }

    return [...selectSet]
}
