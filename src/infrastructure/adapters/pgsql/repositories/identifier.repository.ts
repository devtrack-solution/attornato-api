import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { IdentifierEntity } from '@/infrastructure/adapters/pgsql/entities/identifier.entity'
import { IdentifierRepositoryOutboundPort, IdentifierRepositoryOutboundPortSymbol } from '@/domain/client/identifier/ports/outbound/identifier-repository.outbound-port'

@BindProvider(IdentifierRepositoryOutboundPortSymbol)
export class IdentifierRepository extends RepositoryBase<IdentifierEntity> implements IdentifierRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(IdentifierEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
