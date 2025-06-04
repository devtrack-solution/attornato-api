import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { PracticeAreaRepositoryOutboundPort, PracticeAreaRepositoryOutboundPortSymbol } from '@/domain/process/component/practice-area/ports/outbound/practice-area-repository.outbound-port'
import { PracticeAreaEntity } from '@/infrastructure/adapters/relational-database/entities/practice-area.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(PracticeAreaRepositoryOutboundPortSymbol)
export class PracticeAreaRepository extends RepositoryBase<PracticeAreaEntity> implements PracticeAreaRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(PracticeAreaEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
