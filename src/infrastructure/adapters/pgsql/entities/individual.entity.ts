import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity('individual')
export class IndividualEntity extends EntityBase {
  @ManyToOne(() => GroupCustomerEntity, (groupCustomer) => groupCustomer.individual)
  @JoinColumn({ name: 'groupCustomerId', referencedColumnName: 'id' })
  groupCustomer!: GroupCustomerEntity

  @Column({ type: 'uuid', nullable: true })
  groupCustomerId?: string

  @ManyToOne(() => ProfileEntity, (profile) => profile.individual)
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile!: ProfileEntity

  @Column({ type: 'uuid', nullable: true })
  profileId?: string

  @ManyToOne(() => PersonEntity, (person) => person.individual, { cascade: true, eager: true })
  @JoinColumn({ name: 'personId', referencedColumnName: 'id' })
  person!: PersonEntity

  @Column({ type: 'uuid', nullable: true })
  personId?: string

  @Column({ type: 'varchar', length: 255 })
  name!: string

  @Column({ type: 'varchar', length: 255 })
  nationality!: string

  @Column({ type: 'varchar', length: 255 })
  occupation!: string

  @Column({ type: 'varchar', length: 255 })
  educationLevel!: string

  @Column({ type: 'varchar', length: 255 })
  maritalStatus!: string

  @Column({ type: 'date', nullable: false })
  birthDate!: Date

  @Column({ type: 'varchar', unique: true, length: 20 })
  cpf!: string

  @Column({ type: 'varchar', length: 20 })
  rg!: string

  @Column({ type: 'varchar', unique: true, length: 20 })
  pis!: string
}
