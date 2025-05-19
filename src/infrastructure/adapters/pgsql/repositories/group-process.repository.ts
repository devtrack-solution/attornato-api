import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { GroupProcessEntity } from '@/infrastructure/adapters/pgsql/entities/group-process.entity'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/component/group-process/ports/outbound/group-process-repository.outbound-port'

@BindProvider(GroupProcessRepositoryOutboundPortSymbol)
export class GroupProcessRepository extends RepositoryBase<GroupProcessEntity> implements GroupProcessRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(GroupProcessEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
