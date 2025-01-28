import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { TodoTypes } from '@/domain/todo/types/todo.types'
import { EntityBase } from "@/infrastructure/adapters/pgsql/entities/entity-base";

@Entity('todos')
export class TodoEntity extends EntityBase implements TodoTypes.Repository {
  @PrimaryColumn({ type: 'uuid' })
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
