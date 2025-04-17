import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'

@Entity('group_customer')
export class GroupCustomerEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => LegalEntity, (legal) => legal.groupCustomer)
  legal!: LegalEntity[]
}
