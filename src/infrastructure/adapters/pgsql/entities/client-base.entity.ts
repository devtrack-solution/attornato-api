import { Column, Entity, JoinColumn, ManyToOne, OneToOne, TableInheritance } from 'typeorm'
import { GroupCustomerEntity } from '@/infrastructure/adapters/pgsql/entities/group-customer.entity'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'

@Entity({ name: 'clients'})
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class ClientBaseEntity extends EntityBase {
  @ManyToOne(() => GroupCustomerEntity, (groupCustomer) => groupCustomer.client)
  @JoinColumn({ name: 'groupCustomerId', referencedColumnName: 'id' })
  groupCustomer!: GroupCustomerEntity

  @Column({ type: 'uuid', nullable: true })
  groupCustomerId?: string

  @ManyToOne(() => ProfileEntity, (profile) => profile.client)
  @JoinColumn({ name: 'profileId', referencedColumnName: 'id' })
  profile!: ProfileEntity

  @Column({ type: 'uuid', nullable: true })
  profileId?: string

  @OneToOne(() => PersonEntity, (person) => person.client, { cascade: true, eager: true })
  @JoinColumn({ name: 'personId', referencedColumnName: 'id' })
  person!: PersonEntity

  @Column({ type: 'uuid', nullable: false })
  personId!: string
}
