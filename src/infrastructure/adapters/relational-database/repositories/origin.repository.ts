import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { OriginEntity } from '@/infrastructure/adapters/relational-database/entities/origin.entity'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(OriginRepositoryOutboundPortSymbol)
export class OriginRepository extends RepositoryBase<OriginEntity> implements OriginRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(OriginEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
