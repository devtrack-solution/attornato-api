import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { ActionObjectRepositoryOutboundPort, ActionObjectRepositoryOutboundPortSymbol } from '@/domain/process/component/action-object/ports/outbound/action-object-repository.outbound-port'
import { ActionObjectEntity } from '@/infrastructure/adapters/relational-database/entities/action-object.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(ActionObjectRepositoryOutboundPortSymbol)
export class ActionObjectRepository extends RepositoryBase<ActionObjectEntity> implements ActionObjectRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(ActionObjectEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
