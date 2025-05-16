import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { ClientBaseEntity } from '@/infrastructure/adapters/pgsql/entities/client-base.entity'

@Entity('profiles')
export class ProfileEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => ClientBaseEntity, (client) => client.profile)
  client?: ClientBaseEntity[]
}
