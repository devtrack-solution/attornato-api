import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { OriginEntity } from '@/infrastructure/adapters/pgsql/entities/origin.entity'
import { OriginRepositoryOutboundPort, OriginRepositoryOutboundPortSymbol } from '@/domain/process/component/origin/ports/outbound/origin-repository.outbound-port'

@BindProvider(OriginRepositoryOutboundPortSymbol)
export class OriginRepository extends RepositoryBase<OriginEntity> implements OriginRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(OriginEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
