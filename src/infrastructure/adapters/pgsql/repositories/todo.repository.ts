import { type TodoRepositoryOutboundPort, TodoRepositoryOutboundPortSymbol } from '@/domain/todo/ports/outbound/todo-repository.outbound-port'
import { TodoTypes } from '@/domain/todo/types/todo.types'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { DataSource, Repository } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { TodoEntity } from '@/infrastructure/adapters/pgsql/entities/todo.entity'
import { Logger } from '@nestjs/common'

@BindProvider(TodoRepositoryOutboundPortSymbol)
export class TodoRepository extends Repository<TodoEntity> implements TodoRepositoryOutboundPort {
  private readonly logger = new Logger(TodoRepository.name)

  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }

  async saveObject(todo: Partial<TodoTypes.Input>): Promise<void> {
    try {
      await this.save(todo)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async findByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository | null> {
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

  async findAllByCriteria(props: TodoTypes.Criteria): Promise<TodoTypes.Repository[]> {
    try {
      return await this.findBy(props)
    } catch (e) {
      this.logger.error(`Error: ${e}`)
      throw e
    }
  }

  async updateObject(todo: Partial<TodoTypes.Input>): Promise<void> {
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
