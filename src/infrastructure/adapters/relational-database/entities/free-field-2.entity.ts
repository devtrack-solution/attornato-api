import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'

@Entity('free_field_2')
export class FreeField2Entity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
