import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";
import { TodoType } from '@/domain/todo/types/todo.type'
import { EntityBase } from "@/infrastructure/adapters/pgsql/entities/entity-base";

@Entity('todos')
export class TodoEntity extends EntityBase implements TodoType.Repository {
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

}
