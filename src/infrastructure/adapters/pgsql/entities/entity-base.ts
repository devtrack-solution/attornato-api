/**
 * Created by Wilton Oliveira Ferreira on 24/01/2023
 */

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  DeleteDateColumn
} from "typeorm";

export abstract class EntityBase extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  @Index({ unique: false })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @Index({ unique: false })
  updatedAt!: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  @Index({ unique: false })
  deletedAt!: Date

  @Column({
    name: 'is_active',
    type: 'tinyint',
    nullable: false,
    default: true,
  })
  @Index({ unique: false })
  enable?: boolean

  @Column({ name: 'last_change_by_user_id', nullable: true })
  @Index({ unique: false })
  lastUpdatedByUser!: string
}
