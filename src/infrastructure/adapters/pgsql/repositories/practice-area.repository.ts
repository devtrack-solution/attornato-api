import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/component/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { PracticeAreaEntity } from '@/infrastructure/adapters/pgsql/entities/practice-area.entity'

@BindProvider(PracticeAreaRepositoryOutboundPortSymbol)
export class PracticeAreaRepository extends RepositoryBase<PracticeAreaEntity> implements PracticeAreaRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(PracticeAreaEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
