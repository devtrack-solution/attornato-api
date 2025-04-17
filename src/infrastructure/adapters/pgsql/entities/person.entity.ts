import { Column, Entity, JoinColumn, OneToOne, TableInheritance } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'
import { ContactPersonEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person.entity'

@Entity('persons')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class PersonEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  clientId!: string

  @OneToOne(() => CommunicationAddressEntity, { cascade: true, eager: true })
  @JoinColumn()
  communicationAddress!: CommunicationAddressEntity

  @OneToOne(() => ContactPersonEntity, { cascade: true, eager: true })
  @JoinColumn()
  contactPerson!: ContactPersonEntity
}
