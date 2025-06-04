/**
 * File name role.entity.ts
 * Created by wof on 20/12/2023
 */

import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/relational-database/entities/entity-base'
import { PermissionEntity } from '@/infrastructure/adapters/relational-database/entities/permission.entity'

@Entity('roles')
export class RoleEntity extends EntityBase {
  @Column({ name: 'name', nullable: false, unique: true })
  name!: string

  @Column({ name: 'description', nullable: false })
  description!: string

  @Column({ name: 'level', type: 'integer', nullable: false })
  level!: number

  @ManyToMany(() => PermissionEntity, { eager: true })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'id_role', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'id_permission',
      referencedColumnName: 'id',
    },
  })
  permissions!: PermissionEntity[]
}
