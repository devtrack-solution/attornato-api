import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { FreeFieldEntity } from '@/infrastructure/adapters/pgsql/entities/free-field.entity'

@BindProvider(FreeFieldRepositoryOutboundPortSymbol)
export class FreeFieldRepository extends RepositoryBase<FreeFieldEntity> implements FreeFieldRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(FreeFieldEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
