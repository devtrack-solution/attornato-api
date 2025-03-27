import { Entity, Column } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('procedural-statuss')
export class ProceduralStatusEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string
}
