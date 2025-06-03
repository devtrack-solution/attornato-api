export class QueryAliasHelper {
  constructor(private readonly rootAlias: string) {}

  /**
   * Retorna o alias SQL do campo com base no caminho (ex: "role.id" → "role_id").
   */
  getSelectAlias(field: string): string {
    const parts = field.split('.')
    const last = parts.pop()!
    const prefix = parts.length ? parts.join('_') + '_' : ''
    return prefix + this.camelToSnake(last)
  }

  /**
   * Retorna o caminho completo do campo com alias (ex: "role.id" → "roleAlias.id").
   */
  getColumnPath(field: string): string {
    const parts = field.split('.')
    const property = parts.pop()!
    const alias = parts.length ? this.getJoinAlias(parts.join('.')) : this.rootAlias
    return `${alias}.${property}`
  }

  /**
   * Retorna o alias de junção para joins (ex: "role.permission" → "role_permission").
   */
  getJoinAlias(path: string): string {
    return path.split('.').join('_')
  }

  /**
   * Converte camelCase ou PascalCase para snake_case.
   */
  private camelToSnake(input: string): string {
    return input.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
  }
}
