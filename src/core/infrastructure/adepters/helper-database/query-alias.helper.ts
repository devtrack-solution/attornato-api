export class QueryAliasHelper {
  constructor(private readonly rootAlias: string) {}

  getColumnPath(field: string): string {
    if (field.includes('.')) return field
    return `${this.rootAlias}.${field}`
  }

  getFieldAlias(field: string): string {
    return field.replace(/\./g, '_')
  }
}
