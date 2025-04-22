import { Column, Entity, JoinColumn, OneToMany, OneToOne, TableInheritance } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'
import { ContactPersonBaseEntity } from '@/infrastructure/adapters/pgsql/entities/contact-person-base.entity'
import { LegalEntity } from '@/infrastructure/adapters/pgsql/entities/legal.entity'

@Entity('persons')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class PersonEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255, nullable: false })
  clientId!: string

  @OneToOne(() => CommunicationAddressEntity, { cascade: true, eager: true })
  @JoinColumn()
  communicationAddress!: CommunicationAddressEntity

  @OneToOne(() => ContactPersonBaseEntity, { cascade: true, eager: true })
  @JoinColumn()
  contactPerson!: ContactPersonBaseEntity

  @OneToMany(() => LegalEntity, (legal) => legal.person)
  legal!: LegalEntity[]
}
