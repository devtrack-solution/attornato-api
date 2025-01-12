import { ICreateTodoUseCase } from "@/usecase/todo/create/create-todo.usecase-interface";
import { ITransactionContext } from "@/core/ports/transaction-context";
import { Todo } from "@/domain/types/todo.types";
import { Injectable, Logger } from "@nestjs/common";
import { ITodoRepository } from "@/domain/repositories/todo.repository-interface";
import { BasicService } from "@/commons/services/basic-service";


@Injectable()
export class CreateTodoUseCase extends BasicService<Todo.Input, Todo.Output> implements ICreateTodoUseCase {
  private readonly logger = new Logger(CreateTodoUseCase.name)

  constructor(
    private readonly todoRepository: ITodoRepository
  ) {
    super()
  }
  async perform(payload: ITransactionContext<Todo.Input>): Promise<Todo.Output> {
    throw new Error("Method not implemented.");
  }
}