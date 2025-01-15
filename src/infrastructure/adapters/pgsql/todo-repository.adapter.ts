import { ITodoRepository } from "@/application/domain/todo/ports/todo-repository.port";


export class TodoRepositoryAdapter implements ITodoRepository {
  async save<T extends any>(data: T): Promise<any> {
    throw new Error("Method not implemented.");
  }
}