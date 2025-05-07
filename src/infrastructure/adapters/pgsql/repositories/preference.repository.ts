import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { PreferenceEntity } from '@/infrastructure/adapters/pgsql/entities/preference.entity'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'

@BindProvider(PreferenceRepositoryOutboundPortSymbol)
export class PreferenceRepository extends RepositoryBase<PreferenceEntity> implements PreferenceRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(PreferenceEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
