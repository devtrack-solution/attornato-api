import { Column, Entity } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'

@Entity('identifier')
export class IdentifierEntity extends EntityBase {
  @Column({ type: 'int' })
  value!: number

  @Column({ type: 'varchar', length: 8 })
  clientCategory!: string
}
