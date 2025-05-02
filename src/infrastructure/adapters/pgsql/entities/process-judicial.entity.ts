import { ChildEntity, Column } from 'typeorm'
import { ProcessBaseEntity } from '@/infrastructure/adapters/pgsql/entities/process-base.entity'

@ChildEntity('process_judicial')
export class ProcessJudicialEntity extends ProcessBaseEntity {
  @Column({ nullable: false })
  cnjNumber!: string
}
