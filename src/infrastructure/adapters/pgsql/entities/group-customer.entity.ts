import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { LegalDataEntity } from '@/infrastructure/adapters/pgsql/entities/legal-data.entity'

@Entity('group_customer')
export class GroupCustomerEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => LegalDataEntity, (legalData) => legalData.groupCustomer)
  legalData!: LegalDataEntity[]
}
