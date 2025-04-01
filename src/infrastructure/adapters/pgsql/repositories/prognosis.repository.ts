import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { PrognosisEntity } from '@/infrastructure/adapters/pgsql/entities/prognosis.entity'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/prognosis/ports/outbound/prognosis-repository.outbound-port'

@BindProvider(PrognosisRepositoryOutboundPortSymbol)
export class PrognosisRepository extends RepositoryBase<PrognosisEntity> implements PrognosisRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(PrognosisEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
