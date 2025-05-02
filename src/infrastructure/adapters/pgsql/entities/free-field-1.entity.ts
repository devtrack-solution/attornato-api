import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('free_field_1')
export class FreeField1Entity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
