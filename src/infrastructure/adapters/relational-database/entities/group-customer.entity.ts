import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { ClientBaseEntity } from '@/infrastructure/adapters/relational-database/entities/client-base.entity'

@Entity('group_customer')
export class GroupCustomerEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => ClientBaseEntity, (client) => client.groupCustomer)
  client?: ClientBaseEntity[]
}
