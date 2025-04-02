import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('partners')
export class PartnerEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
