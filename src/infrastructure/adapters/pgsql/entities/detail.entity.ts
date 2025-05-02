import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('details')
export class DetailEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
