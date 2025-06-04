import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import {
  LocalProcedureNameRepositoryOutboundPort,
  LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { LocalProcedureNameEntity } from '@/infrastructure/adapters/relational-database/entities/local-procedure-name.entity'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(LocalProcedureNameRepositoryOutboundPortSymbol)
export class LocalProcedureNameRepository extends RepositoryBase<LocalProcedureNameEntity> implements LocalProcedureNameRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(LocalProcedureNameEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
