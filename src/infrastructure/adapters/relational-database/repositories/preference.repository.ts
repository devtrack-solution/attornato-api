import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/relational-database/repositories/repository-base'
import { PreferenceEntity } from '@/infrastructure/adapters/relational-database/entities/preference.entity'
import { PreferenceRepositoryOutboundPort, PreferenceRepositoryOutboundPortSymbol } from '@/domain/account/component/preference/ports/outbound/preference-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(PreferenceRepositoryOutboundPortSymbol)
export class PreferenceRepository extends RepositoryBase<PreferenceEntity> implements PreferenceRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(PreferenceEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
