import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { AccountEntity } from '@/infrastructure/adapters/relational-database/entities/account.entity'

@Entity('preferences')
export class PreferenceEntity extends EntityBase {
  @Column({ type: 'varchar', length: 255 })
  key!: string

  @Column({ type: 'varchar', length: 255 })
  value!: string

  @ManyToOne(() => AccountEntity, (account) => account.preferences)
  @JoinColumn({ name: 'accountId', referencedColumnName: 'id' })
  account!: AccountEntity

  @Column({ type: 'uuid', nullable: true })
  accountId!: string
}
