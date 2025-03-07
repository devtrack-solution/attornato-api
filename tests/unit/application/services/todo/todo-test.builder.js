"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoTestBuilder = void 0;
const identity_vo_1 = require("../../../../../src/core/domain/value-objects/identity.vo");
class TodoTestBuilder {
    id = identity_vo_1.IdentityVo.generate().toString();
    name = 'Valid Task';
    email = 'valid@company.com';
    age = 25;
    birthday = new Date('2000-01-01T00:00:00');
    enable = true;
    height = 170;
    createdAt = new Date();
    updatedAt = new Date();
    deletedAt;
    createdUserId = identity_vo_1.IdentityVo.generate().toString();
    lastUpdatedUserId = identity_vo_1.IdentityVo.generate().toString();
    static create() {
        return new TodoTestBuilder();
    }
    withId(id) {
        this.id = id;
        return this;
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withEmail(email) {
        this.email = email;
        return this;
    }
    withAge(age) {
        this.age = age;
        return this;
    }
    withBirthday(birthday) {
        this.birthday = birthday;
        return this;
    }
    withHeight(height) {
        this.height = height;
        return this;
    }
    withEnable(enable) {
        this.enable = enable;
        return this;
    }
    withDeletedAt(deletedAt) {
        this.deletedAt = deletedAt;
        return this;
    }
    withCreatedUserId(createdUserId) {
        this.createdUserId = createdUserId;
        return this;
    }
    withLastUpdatedUserId(lastUpdatedUserId) {
        this.lastUpdatedUserId = lastUpdatedUserId;
        return this;
    }
    build() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            age: this.age,
            birthday: this.birthday,
            enable: this.enable,
            height: this.height,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            createdUserId: this.createdUserId,
            lastUpdatedUserId: this.lastUpdatedUserId,
        };
    }
    static getSuccess() {
        return TodoTestBuilder.create().build();
    }
    static getFailOnEmptyName() {
        return TodoTestBuilder.create().withName('').build();
    }
    static getFailOnEmailInvalid() {
        return TodoTestBuilder.create().withEmail('invalid-email').build();
    }
    static getFailOnInvalidAge() {
        return TodoTestBuilder.create().withAge(-5).build();
    }
    static getFailOnInvalidHeight() {
        return TodoTestBuilder.create().withHeight(5).build();
    }
    static getFailOnDeletedTodo() {
        return TodoTestBuilder.create().withDeletedAt(new Date()).build();
    }
}
exports.TodoTestBuilder = TodoTestBuilder;
//# sourceMappingURL=todo-test.builder.js.map