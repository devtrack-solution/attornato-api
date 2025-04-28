import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from './repository-base'
import {
  SubjectRepositoryOutboundPort,
  SubjectRepositoryOutboundPortSymbol,
} from '@/domain/process/subject/ports/outbound/subject-repository.outbound-port'
import { SubjectEntity } from '@/infrastructure/adapters/pgsql/entities/subject.entity'

@BindProvider(SubjectRepositoryOutboundPortSymbol)
export class SubjectRepository extends RepositoryBase<SubjectEntity> implements SubjectRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(SubjectEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
