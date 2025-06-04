import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { GroupProcessEntity } from '@/infrastructure/adapters/relational-database/entities/group-process.entity'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/component/group-process/ports/outbound/group-process-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(GroupProcessRepositoryOutboundPortSymbol)
export class GroupProcessRepository extends RepositoryBase<GroupProcessEntity> implements GroupProcessRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(GroupProcessEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
