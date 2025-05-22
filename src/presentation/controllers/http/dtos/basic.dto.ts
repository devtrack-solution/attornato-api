import { ApiProperty } from '@nestjs/swagger'
import { DateTime } from 'luxon'
import { ConfigEnvironmentService } from '@/infrastructure/config/config-environment.service'
import { AppConfig } from '@/domain/app-config.interface'
import { v4 as uuidv4 } from 'uuid'

function data() {
  const config: AppConfig = new ConfigEnvironmentService()
  return DateTime.now().setZone(config.project.timeZone)
}

function userId() {
  return uuidv4()
}

function otherUserId() {
  return uuidv4()
}

export class BasicDto {
  @ApiProperty({
    description: 'Unique identifier of the entity',
    example: userId(),
    required: false,
  })
  id?: string

  @ApiProperty({
    description: 'Unique identifier of the user who owns this entity',
    example: userId(),
    required: false,
  })
  userId?: string

  @ApiProperty({
    description: 'Unique identifier of the last user who updated this entity',
    example: otherUserId(),
    required: false,
  })
  lastUpdatedUserId?: string

  @ApiProperty({
    description: 'Unique identifier of the user who created this entity',
    example: userId(),
    required: false,
  })
  createdUserId?: string

  @ApiProperty({
    description: 'Timestamp when the entity was created',
    example: data(),
    required: false,
  })
  createdAt?: Date

  @ApiProperty({
    description: 'Timestamp when the entity was last updated',
    example: data(),
    required: false,
  })
  updatedAt?: Date

  @ApiProperty({
    description: 'Timestamp when the entity was deleted (null if not deleted)',
    example: null,
    required: false,
  })
  deletedAt?: Date

  @ApiProperty({
    description: 'Indicates whether the entity is active',
    example: true,
    required: false,
  })
  enable?: boolean
}
