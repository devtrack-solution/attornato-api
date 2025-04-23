import { Column, Entity, JoinColumn, OneToMany, OneToOne, TableInheritance } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'
import { ContactPersonEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person.entity'

@Entity('persons')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class PersonEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  clientId!: string

  @OneToOne(() => CommunicationAddressEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'communicationAddressId', referencedColumnName: 'id' })
  communicationAddress!: CommunicationAddressEntity

  @Column({ type: 'uuid', nullable: true })
  communicationAddressId?: string

  @OneToOne(() => ContactPersonEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'contactPersonId', referencedColumnName: 'id' })
  contactPerson!: ContactPersonEntity

  @Column({ type: 'uuid', nullable: true })
  contactPersonId?: string

  @OneToMany(() => LegalEntity, (legal) => legal.person)
  legal!: LegalEntity[]
}
