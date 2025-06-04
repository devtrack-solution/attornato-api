import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { IndividualEntity } from '@/infrastructure/adapters/relational-database/entities/individual.entity'
import { IndividualRepositoryOutboundPort, IndividualRepositoryOutboundPortSymbol } from '@/domain/client/component/individual/ports/outbound/individual-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(IndividualRepositoryOutboundPortSymbol)
export class IndividualRepository extends RepositoryBase<IndividualEntity> implements IndividualRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(IndividualEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
