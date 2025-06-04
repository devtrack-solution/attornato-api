import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { PhaseRepositoryOutboundPortSymbol, PhaseRepositoryOutboundPort } from '@/domain/process/component/phase/ports/outbound/phase-repository.outbound-port'
import { PhaseEntity } from '../entities/phase.entity'
import { RepositoryBase } from './repository-base'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(PhaseRepositoryOutboundPortSymbol)
export class PhaseRepository extends RepositoryBase<PhaseEntity> implements PhaseRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(PhaseEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
