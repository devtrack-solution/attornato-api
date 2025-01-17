import { ICreateTodoUseCase } from '@/application/domain/todo/use-case/create/create-todo.use-case-interface'
import { ITransactionContext } from '@/core/transactions/transaction-context.interface'
import { Injectable, Logger } from '@nestjs/common'
import { BasicService } from '@/commons/services/basic-service'
import { Todo } from '@/domain/todo/types/todo.types'
import { ITodoRepository } from '@/domain/todo/ports/todo-repository.port'

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
