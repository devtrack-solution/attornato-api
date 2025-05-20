import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { RoleEntity } from '@/infrastructure/adapters/pgsql/entities/role.entity'
import { AccountEntity } from '@/infrastructure/adapters/pgsql/entities/account.entity'

@Entity('credentials')
export class CredentialEntity extends EntityBase {
  @Column({ name: 'username', type: 'varchar', length: 50, nullable: false })
  username!: string

  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin!: Date | null

  @Column({ name: 'password_hash', type: 'varchar', length: 100, nullable: true })
  passwordHash?: string

  @Column({ name: 'request_change_password', type: 'boolean', nullable: false, default: true })
  requestNewPassword!: boolean

  @Column({ name: 'expired_at', type: 'timestamp', nullable: true })
  expiredAt!: Date | null

  @Column({ name: 'expired_code_at', type: 'timestamp', nullable: true })
  expiredCodeAt!: Date | null

  @Column({ name: 'reset_password_token', type: 'varchar', length: 255, nullable: true })
  resetPasswordToken!: string | null

  @Column({ name: 'reset_password_code', type: 'varchar', length: 255, nullable: true })
  resetPasswordCode!: string | null

  @ManyToMany(() => RoleEntity, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'credential_role',
    joinColumn: { name: 'id_credential', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'id_role',
      referencedColumnName: 'id',
    },
  })
  roles!: RoleEntity[]

  @OneToOne(() => AccountEntity, (account) => account.credential)
  account?: AccountEntity
}
