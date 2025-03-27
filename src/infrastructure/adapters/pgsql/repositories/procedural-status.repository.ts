import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from './repository-base'
import {
  ProceduralStatusRepositoryOutboundPort,
  ProceduralStatusRepositoryOutboundPortSymbol,
} from '@/domain/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { ProceduralStatusEntity } from '@/infrastructure/adapters/pgsql/entities/procedural-status.entity'

@BindProvider(ProceduralStatusRepositoryOutboundPortSymbol)
export class ProceduralStatusRepository extends RepositoryBase<ProceduralStatusEntity> implements ProceduralStatusRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ProceduralStatusEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
