import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import {
  ActionObjectRepositoryOutboundPort,
  ActionObjectRepositoryOutboundPortSymbol,
} from '@/domain/action-object/ports/outbound/action-object-repository.outbound-port'
import { ActionObjectEntity } from '@/infrastructure/adapters/pgsql/entities/action-object.entity'

@BindProvider(ActionObjectRepositoryOutboundPortSymbol)
export class ActionObjectRepository extends RepositoryBase<ActionObjectEntity> implements ActionObjectRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ActionObjectEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
