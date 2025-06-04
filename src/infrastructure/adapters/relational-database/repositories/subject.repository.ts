import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from './repository-base'
import { SubjectRepositoryOutboundPort, SubjectRepositoryOutboundPortSymbol } from '@/domain/process/component/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectEntity } from '@/infrastructure/adapters/relational-database/entities/subject.entity'
import { AppConfig, AppConfigToken } from '@/domain/app-config.interface'
import { Inject } from '@nestjs/common'

@BindProvider(SubjectRepositoryOutboundPortSymbol)
export class SubjectRepository extends RepositoryBase<SubjectEntity> implements SubjectRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource, @Inject(AppConfigToken) config: AppConfig) {
    super(SubjectEntity, dataSource.createEntityManager(), config, dataSource.createQueryRunner())
  }
}
