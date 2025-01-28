import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { TodoTypes } from '@/domain/todo/types/todo.types'

@Entity('todos')
export class TodoEntity implements TodoTypes.Repository {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  age!: number

  @Column()
  birthday!: Date

  @Column()
  height!: number

  @Column()
  isActive!: boolean
}
