import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('legal')
export class LegalEntity extends EntityBase {
  @ManyToOne(() => GroupCustomerEntity, (groupCustomer) => groupCustomer.legal)
  @JoinColumn({ name: 'groupCustomerId', referencedColumnName: 'id' })
  groupCustomer!: GroupCustomerEntity

  @Column({ type: 'uuid', nullable: true })
  groupCustomerId?: string

  @ManyToOne(() => ProfileEntity, (profile) => profile.legal)
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile!: ProfileEntity

  @Column({ type: 'uuid', nullable: true })
  profileId?: string

  @ManyToOne(() => PersonEntity, (person) => person.legal, { cascade: true, eager: true })
  @JoinColumn({ name: 'personId', referencedColumnName: 'id' })
  person!: PersonEntity

  @Column({ type: 'uuid', nullable: true })
  personId?: string

  @Column({ type: 'varchar', length: 255 })
  responsible!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  companyName!: string

  @Column({ type: 'varchar', length: 255 })
  tradeName!: string

  @Column({ type: 'varchar', length: 255 })
  businessArea!: string

  @Column({ type: 'varchar', unique: true, length: 20 })
  cnpj!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  stateRegistration!: string

  @Column({ type: 'varchar', unique: true, length: 255 })
  municipalRegistration!: string
}
