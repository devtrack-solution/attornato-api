import { Entity, Column, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { AccountEntity } from '@/infrastructure/adapters/relational-database/entities/account.entity'

@Entity('account_persons')
export class AccountPersonEntity extends EntityBase {
  @Column({ type: 'varchar', nullable: false, length: 255 })
  name!: string

  @Column({ type: 'date', nullable: false })
  birthday!: Date

  @Column({ type: 'varchar', nullable: true, length: 255 })
  nickName?: string

  @Column({ type: 'varchar', nullable: true, length: 10 })
  gender?: string

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar?: string

  @Column({ type: 'varchar', nullable: true, length: 30 })
  governanceSocialIdentity?: string

  @OneToOne(() => AccountEntity, (account) => account.accountPerson)
  account?: AccountEntity
}
