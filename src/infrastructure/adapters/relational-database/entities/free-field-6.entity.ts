import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'

@Entity('free_field_6')
export class FreeField6Entity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
