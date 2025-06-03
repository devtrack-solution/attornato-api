import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from './repository-base'
import { ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { ProceduralStatusEntity } from '@/infrastructure/adapters/pgsql/entities/procedural-status.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(ProceduralStatusRepositoryOutboundPortSymbol)
export class ProceduralStatusRepository extends RepositoryBase<ProceduralStatusEntity> implements ProceduralStatusRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ProceduralStatusEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
