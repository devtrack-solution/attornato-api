import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'

@Entity('local_procedure_names')
export class LocalProcedureNameEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
