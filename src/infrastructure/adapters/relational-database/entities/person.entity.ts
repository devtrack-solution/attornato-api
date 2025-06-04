import { Column, Entity, JoinColumn, OneToMany, OneToOne, TableInheritance } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/relational-database/entities/communication-address.entity'
import { ContactPersonEntity } from '@/infrastructure/adapters/relational-database/entities/contact-person.entity'
import { ClientBaseEntity } from '@/infrastructure/adapters/relational-database/entities/client-base.entity'

@Entity('persons')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class PersonEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  clientId!: string

  @OneToOne(() => CommunicationAddressEntity, (communicationAddress) => communicationAddress.person, { cascade: true })
  @JoinColumn({ name: 'communicationAddressId', referencedColumnName: 'id' })
  communicationAddress!: CommunicationAddressEntity

  @Column({ type: 'uuid', nullable: true })
  communicationAddressId?: string

  @OneToOne(() => ContactPersonEntity, (contactPerson) => contactPerson.person, { cascade: true })
  @JoinColumn({ name: 'contactPersonId', referencedColumnName: 'id' })
  contactPerson!: ContactPersonEntity

  @Column({ type: 'uuid', nullable: true })
  contactPersonId?: string

  @OneToOne(() => ClientBaseEntity, (client) => client.person)
  client?: ClientBaseEntity
}
