import { ICreateTodoUseCase } from '@/application/domain/todo/use-case/create/create-todo.use-case-interface'
import { ITransactionContext } from '@/core/transactions/transaction-context.interface'
import { Todo } from '@/application/domain/todo/types/todo.types'
import { Injectable, Logger } from '@nestjs/common'
import { ITodoRepository } from '@/application/domain/todo/ports/todo-repository.port'
import { BasicService } from '@/application/commons/services/basic-service'

@Injectable()
export class CreateTodoUseCase extends BasicService<Todo.Input, Todo.Output> implements ICreateTodoUseCase {
  private readonly logger = new Logger(CreateTodoUseCase.name)

  constructor(private readonly todoRepository: ITodoRepository) {
    super()
  }
  async perform(payload: ITransactionContext<Todo.Input>): Promise<Todo.Output> {
    //const entityFormat convetToEntity.fromDto(payload)
    // await this.todoRepository.save(payload.body)
    throw new Error('Method not implemented.')
  }
}
