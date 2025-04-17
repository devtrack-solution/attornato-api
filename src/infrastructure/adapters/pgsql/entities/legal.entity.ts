import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'

@Entity('legal')
export class LegalEntity extends PersonEntity {
  @ManyToOne(() => GroupCustomerEntity, (groupCustomer) => groupCustomer.legal)
  @JoinColumn({ name: 'groupCustomerId', referencedColumnName: 'id' })
  groupCustomer!: GroupCustomerEntity

  @ManyToOne(() => ProfileEntity, (profile) => profile.legal)
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
}
