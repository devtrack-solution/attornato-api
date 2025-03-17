import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('group_process')
export class GroupProcessEntity extends EntityBase {
  @Column({ type: 'varchar', length: 255 })
  name!: string
}
