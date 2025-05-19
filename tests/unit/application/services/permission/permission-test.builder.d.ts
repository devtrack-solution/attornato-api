import { PermissionType } from '@/domain/todo/types/permission.type'
export declare class PermissionTestBuilder {
  private name
  private description
  private resource
  static create(): PermissionTestBuilder
  withName(name: string): this
  withDescription(description: string): this
  withResource(resource: string): this
  build(): PermissionType.Input
  static getSuccess(): PermissionType.Input
  static getFailOnEmptyName(): PermissionType.Input
  static getFailOnEmptyDescription(): PermissionType.Input
  static getFailOnEmptyResource(): PermissionType.Input
}
