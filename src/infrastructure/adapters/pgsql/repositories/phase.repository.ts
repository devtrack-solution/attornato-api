import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/phase/ports/outbound/phase-repository.outbound-port'
import { PhaseEntity } from '../entities/phase.entity'
import { RepositoryBase } from './repository-base'

@BindProvider(PhaseRepositoryOutboundPortSymbol)
export class PhaseRepository extends RepositoryBase<PhaseEntity> implements PhaseRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(PhaseEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
