import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import {
  LocalProcedureNameRepositoryOutboundPort,
  LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { LocalProcedureNameEntity } from '@/infrastructure/adapters/pgsql/entities/local-procedure-name.entity'

@BindProvider(LocalProcedureNameRepositoryOutboundPortSymbol)
export class LocalProcedureNameRepository extends RepositoryBase<LocalProcedureNameEntity> implements LocalProcedureNameRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(LocalProcedureNameEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
