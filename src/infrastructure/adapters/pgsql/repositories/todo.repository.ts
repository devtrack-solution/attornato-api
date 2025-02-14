import { type TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoType } from '@/domain/todo/types/todo.type'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { DataSource, Repository } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { TodoEntity } from '@/infrastructure/adapters/pgsql/entities/todo.entity'
import { Logger } from '@nestjs/common'
import { RepositoryBase } from "@/infrastructure/adapters/pgsql/repositories/repository-base";

@BindProvider(TodoRepositoryOutboundPortSymbol)
export class TodoRepository extends RepositoryBase<TodoEntity> implements TodoRepositoryOutboundPort {
  private readonly logger = new Logger(TodoRepository.name)

  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }

  async saveObject(todo: Partial<TodoType.Input>): Promise<void> {
    try {
      await this.save(todo)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findByCriteria(props: TodoType.Criteria): Promise<Partial<TodoType.Repository> | null> {
    try {
      return await this.findOneBy(props)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async deleteObject(id: string): Promise<void> {
    try {
      if (await this.existsBy({ id })) {
        await this.softRemove({ id })
      }
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findAllByCriteria(props: TodoType.Criteria): Promise<Partial<TodoType.Repository>[]> {
    try {
      return await this.findBy(props)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async updateObject(todo: Partial<TodoType.Input>): Promise<void> {
    try {
      const loadTodo = await this.findOneBy({ id: todo.id })
      if (!loadTodo) {
        throw new Error('Dados não encontrado')
      }
      Object.assign(loadTodo, todo)
      await this.save(loadTodo)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }
}
