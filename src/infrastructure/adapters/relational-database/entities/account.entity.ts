import { Entity, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { AccountPersonEntity } from '@/infrastructure/adapters/relational-database/entities/account-person.entity'
import { CredentialEntity } from '@/infrastructure/adapters/relational-database/entities/credential.entity'
import { PreferenceEntity } from '@/infrastructure/adapters/relational-database/entities/preference.entity'

@Entity('accounts')
export class AccountEntity extends EntityBase {
  @OneToOne(() => AccountPersonEntity, (accountPerson) => accountPerson.account, { cascade: true, eager: true })
  @JoinColumn({ name: 'accountPersonId', referencedColumnName: 'id' })
  accountPerson?: AccountPersonEntity

  @Column({ type: 'uuid', nullable: true })
  accountPersonId?: string

  @OneToOne(() => CredentialEntity, (credential) => credential.account, { cascade: true, eager: true })
  @JoinColumn({ name: 'credentialId', referencedColumnName: 'id' })
  credential?: CredentialEntity

  @Column({ type: 'uuid', nullable: true })
  credentialId?: string

  @OneToMany(() => PreferenceEntity, (preference) => preference.account, { eager: true })
  preferences?: PreferenceEntity[]
}
