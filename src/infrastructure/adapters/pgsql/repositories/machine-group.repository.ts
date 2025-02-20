import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { MachineGroupEntity } from '@/infrastructure/adapters/pgsql/entities/machine-group.entity';
import { BindProvider } from '@/infrastructure/decorators/bind.decorator';
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base';
import { MachineGroupRepositoryOutboundPort, MachineGroupRepositoryOutboundPortSymbol } from '@/domain/machine/group/ports/outbound/machine-group-repository.outbound-port';

@BindProvider(MachineGroupRepositoryOutboundPortSymbol)
export class MachineGroupRepository extends RepositoryBase<MachineGroupEntity> implements MachineGroupRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(MachineGroupEntity, dataSource.createEntityManager(), dataSource.createQueryRunner());
  }
}
