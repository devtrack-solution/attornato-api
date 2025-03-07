"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionTestBuilder = void 0;
class PermissionTestBuilder {
    name = 'READ_PERMISSION';
    description = 'Allows read access to resources.';
    resource = 'PERMISSION';
    static create() {
        return new PermissionTestBuilder();
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withDescription(description) {
        this.description = description;
        return this;
    }
    withResource(resource) {
        this.resource = resource;
        return this;
    }
    build() {
        return {
            name: this.name,
            description: this.description,
            resource: this.resource,
        };
    }
    static getSuccess() {
        return PermissionTestBuilder.create().build();
    }
    static getFailOnEmptyName() {
        return PermissionTestBuilder.create().withName('').build();
    }
    static getFailOnEmptyDescription() {
        return PermissionTestBuilder.create().withDescription('').build();
    }
    static getFailOnEmptyResource() {
        return PermissionTestBuilder.create().withResource('').build();
    }
}
exports.PermissionTestBuilder = PermissionTestBuilder;
//# sourceMappingURL=permission-test.builder.js.map