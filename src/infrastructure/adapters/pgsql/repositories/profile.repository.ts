import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { ProfileEntity } from '@/infrastructure/adapters/pgsql/entities/profile.entity'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/profile/ports/outbound/profile-repository.outbound-port'

@BindProvider(ProfileRepositoryOutboundPortSymbol)
export class ProfileRepository extends RepositoryBase<ProfileEntity> implements ProfileRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(ProfileEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
