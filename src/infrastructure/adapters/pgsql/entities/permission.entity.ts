import { Entity, Column, ManyToMany } from 'typeorm'

import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { PermissionType } from '@/domain/securities/types/permission.type'

@Entity('permissions')
export class PermissionEntity extends EntityBase implements PermissionType.Repository {
  @Column({ type: 'varchar', length: 20, name: 'name', nullable: false })
  name!: string

  @Column({ type: 'varchar', length: 50, name: 'description', nullable: false })
  description!: string

  @Column({ type: 'varchar', length: 20, name: 'resource', nullable: false })
  resource!: string
}
