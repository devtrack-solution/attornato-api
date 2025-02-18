import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { MachineEntity } from '@/infrastructure/adapters/pgsql/entities/machine.entity'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { MachineRepositoryOutboundPort, MachineRepositoryOutboundPortSymbol } from '@/domain/machine/ports/outbound/machine-repository.outbound-port'

@BindProvider(MachineRepositoryOutboundPortSymbol)
export class MachineRepository extends RepositoryBase<MachineEntity> implements MachineRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(MachineEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
