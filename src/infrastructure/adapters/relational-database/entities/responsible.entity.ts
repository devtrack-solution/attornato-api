import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'

@Entity('responsibles')
export class ResponsibleEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
