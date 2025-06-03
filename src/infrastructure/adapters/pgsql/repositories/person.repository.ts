import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { PersonEntity } from '@/infrastructure/adapters/pgsql/entities/person.entity'
import { PersonRepositoryOutboundPort, PersonRepositoryOutboundPortSymbol } from '@/domain/client/component/person/ports/outbound/person-repository.outbound-port'
import { Inject } from '@nestjs/common'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'


@BindProvider(PersonRepositoryOutboundPortSymbol)
export class PersonRepository extends RepositoryBase<PersonEntity> implements PersonRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(PersonEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
