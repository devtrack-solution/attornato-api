import { Entity, Column, OneToMany } from 'typeorm'
import { EntityBase } from '@/infrastructure/adapters/pgsql/entities/entity-base'
import { LegalEntity } from "@/infrastructure/adapters/pgsql/entities/legal.entity";

@Entity('profile')
export class ProfileEntity extends EntityBase {
  @Column({ type: 'varchar', unique: true, length: 255 })
  name!: string

  @OneToMany(() => LegalEntity, (legal) => legal.profile)
  legal!: LegalEntity[]
}
