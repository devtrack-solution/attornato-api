import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import {CommunicationChannelEntity} from "@/infrastructure/adapters/pgsql/entities/communication-channel.entity";
import {CommunicationAddressEntity} from "@/infrastructure/adapters/pgsql/entities/communication-address.entity";

@Entity('contacts')
export class ContactEntity extends EntityBase {
  @Column({ type: 'varchar', length: 17 })
  value!: string

  @ManyToOne(() => CommunicationChannelEntity, (communicationChannel) => communicationChannel.contacts, { eager: true })
  @JoinColumn({ name: 'communicationChannelId', referencedColumnName: 'id' })
  communicationChannel!: CommunicationChannelEntity

  @Column({ type: 'uuid', nullable: true })
  communicationChannelId!: string

  @ManyToOne(() => CommunicationAddressEntity, address => address.contacts)
  @JoinColumn({ name: 'communicationAddressId' })
  communicationAddress!: CommunicationAddressEntity

  @Column({ type: 'uuid', nullable: true })
  communicationAddressId?: string
}
