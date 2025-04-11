import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'

@Entity('legal_data')
export class LegalDataEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  clientId!: string

  @ManyToOne(() => GroupCustomerEntity, (groupCustomer) => groupCustomer.legalData)
  @JoinColumn({ name: 'groupCustomerId', referencedColumnName: 'id' })
  groupCustomer!: GroupCustomerEntity

  @ManyToOne(() => ProfileEntity, (profile) => profile.legalData)
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile!: ProfileEntity

  @Column({ type: 'varchar', unique: true, length: 255 })
  responsable!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  companyName!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  tradeName!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  businessArea!: string

  @Column({ type: 'varchar', unique: true, length: 17 })
  cnpj!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  stateRegistration!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  municipalRegistration!: string

  @OneToOne(() => LegalEntity, (legal) => legal.legalData)
  legal!: LegalEntity
}
