import { PermissionType } from '@/domain/securities/types/permission.type'

export class PermissionTestBuilder {
  private name: string = 'READ_PERMISSION'
  private description: string = 'Allows read access to resources.'
  private resource: string = 'PERMISSION'

  static create(): PermissionTestBuilder {
    return new PermissionTestBuilder()
  }

  withName(name: string): this {
    this.name = name
    return this
  }

  withDescription(description: string): this {
    this.description = description
    return this
  }

  withResource(resource: string): this {
    this.resource = resource
    return this
  }

  build(): PermissionType.Input {
    return {
      name: this.name,
      description: this.description,
      resource: this.resource,
    }
  }

  // ✅ Valid Permission (Success Case)
  static getSuccess(): PermissionType.Input {
    return PermissionTestBuilder.create().build()
  }

  // ❌ Fail Case: Name is empty
  static getFailOnEmptyName(): PermissionType.Input {
    return PermissionTestBuilder.create().withName('').build()
  }

  // ❌ Fail Case: Description is empty
  static getFailOnEmptyDescription(): PermissionType.Input {
    return PermissionTestBuilder.create().withDescription('').build()
  }

  // ❌ Fail Case: Resource is empty
  static getFailOnEmptyResource(): PermissionType.Input {
    return PermissionTestBuilder.create().withResource('').build()
  }
}
