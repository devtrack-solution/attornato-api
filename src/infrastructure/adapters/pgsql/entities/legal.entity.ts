import { Entity, JoinColumn, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { LegalDataEntity } from '@/infrastructure/adapters/pgsql/entities/legal-data.entity'
import { CommunicationAddressEntity } from '@/infrastructure/adapters/pgsql/entities/communication-address.entity'
import {ContactPersonEntity} from "@/infrastructure/adapters/pgsql/entities/contact-person.entity";

@Entity('legal')
export class LegalEntity extends EntityBase {
  @OneToOne(() => LegalDataEntity, (legalData) => legalData.legal, { nullable: true, eager: false, cascade: true })
  @JoinColumn({ name: 'legalDataId', referencedColumnName: 'id' })
  legalData!: LegalDataEntity

  @OneToOne(() => CommunicationAddressEntity, (communicationAddress) => communicationAddress.legal, { nullable: true, eager: false, cascade: true })
  @JoinColumn({ name: 'communicationAddressId', referencedColumnName: 'id' })
  communicationAddress!: CommunicationAddressEntity

  @OneToOne(() => ContactPersonEntity, (contactPerson) => contactPerson.legal, { nullable: true, eager: false, cascade: true })
  @JoinColumn({ name: 'contactPersonId', referencedColumnName: 'id' })
  contactPerson!: ContactPersonEntity
}
