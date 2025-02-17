import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm'
import { TodoType } from '@/domain/todo/types/todo.type'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('todos')
export class TodoEntity extends EntityBase implements TodoType.Repository {
  @Column({ type: 'varchar', length: 100, name: 'name' })
  name!: string

  @Column()
  email!: string

  @Column({ type: 'int', name: 'ages' })
  age!: number

  @Column({ type: 'date', name: 'birthday' })
  birthday!: Date

  @Column()
  height!: number
}
