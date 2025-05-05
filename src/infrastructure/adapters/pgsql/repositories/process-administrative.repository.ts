import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ProcessAdministrativeEntity } from '@/infrastructure/adapters/pgsql/entities/process-administrative.entity'
import { AdministrativeRepositoryOutboundPort, AdministrativeRepositoryOutboundPortSymbol } from '@/domain/process/component/administrative/ports/outbound/administrative-repository.outbound-port'

@BindProvider(AdministrativeRepositoryOutboundPortSymbol)
export class AdministrativeRepository extends RepositoryBase<ProcessAdministrativeEntity> implements AdministrativeRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ProcessAdministrativeEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
