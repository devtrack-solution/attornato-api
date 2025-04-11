import { QueryFailedError, DataSource } from 'typeorm'
import { ValidationErrorResponse } from '@/core/domain/validators/validation-error-response'
import { ValidationErrorDetail } from '@/core/domain/validators/validation-error-detail'

export class TypeOrmErrorMapper {
  private static readonly ERROR_PATTERNS: { [key: string]: (error: QueryFailedError, dataSource: DataSource) => ValidationErrorResponse } = {
    'duplicate key value': (error, dataSource) =>
      new ValidationErrorResponse('Unique constraint violated', [
        new ValidationErrorDetail({
          fieldName: TypeOrmErrorMapper.extractField(error, dataSource),
          message: 'This value must be unique.',
          value: TypeOrmErrorMapper.extractValue(error),
        }),
      ]),

    'violates foreign key constraint': (error, dataSource) =>
      new ValidationErrorResponse('Foreign key constraint violated', [
        new ValidationErrorDetail({
          fieldName: TypeOrmErrorMapper.extractField(error, dataSource),
          message: 'This reference does not exist or has dependent records.',
          value: TypeOrmErrorMapper.extractValue(error),
        }),
      ]),

    'violates check constraint': (error, dataSource) =>
      new ValidationErrorResponse('Check constraint violated', [
        new ValidationErrorDetail({
          fieldName: TypeOrmErrorMapper.extractField(error, dataSource),
          message: 'Invalid value that violates a database constraint.',
          value: TypeOrmErrorMapper.extractValue(error),
        }),
      ]),
  }

  static map(error: QueryFailedError, dataSource: DataSource): ValidationErrorResponse {
    for (const pattern of Object.keys(TypeOrmErrorMapper.ERROR_PATTERNS)) {
      if (error.message.includes(pattern)) {
        return TypeOrmErrorMapper.ERROR_PATTERNS[pattern](error, dataSource)
      }
    }

    return new ValidationErrorResponse('Database error occurred', [
      new ValidationErrorDetail({
        fieldName: TypeOrmErrorMapper.extractField(error, dataSource),
        message: error.message,
        value: null,
      }),
    ])
  }

  private static extractField(error: QueryFailedError, dataSource: DataSource): string {
    // Extract constraint name from error message
    const match = error.message.match(/"([^"]+)"/)
    const constraintName = match ? match[1] : 'unknown'

    // Look up entity metadata to find the corresponding column
    for (const entity of dataSource.entityMetadatas) {
      // Check unique constraints
      for (const uniqueConstraint of entity.uniques) {
        if (uniqueConstraint.name === constraintName) {
          return uniqueConstraint.columns.map((col) => col.propertyName).join(', ')
        }
      }

      // Check foreign key constraints
      for (const foreignKey of entity.foreignKeys) {
        if (foreignKey.name === constraintName) {
          return foreignKey.columns.map((col) => col.propertyName).join(', ')
        }
      }

      // Check check constraints
      for (const checkConstraint of entity.checks) {
        if (checkConstraint.name === constraintName) {
          return checkConstraint.expression ?? 'unknown'
        }
      }
    }

    return constraintName // If not found, return raw constraint
  }

  private static extractValue(error: QueryFailedError): any {
    // Extract the conflicting value if it's in the error messagae
    const match = error.message.match(/Key \((.*?)\)=\((.*?)\)/)
    return match ? match[2] : null
  }
}
