import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import {
  CredentialRepositoryOutboundPort,
  CredentialRepositoryOutboundPortSymbol,
} from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { CredentialEntity } from '@/infrastructure/adapters/pgsql/entities/credential.entity'

@BindProvider(CredentialRepositoryOutboundPortSymbol)
export class CredentialRepository extends RepositoryBase<CredentialEntity> implements CredentialRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(CredentialEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }
}
