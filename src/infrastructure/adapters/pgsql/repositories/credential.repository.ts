import { DataSource, FindOptionsWhere } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { BindProvider } from '@/infrastructure/decorators/bind.decorator'
import { RepositoryBase } from '@/infrastructure/adapters/pgsql/repositories/repository-base'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { CredentialEntity } from '@/infrastructure/adapters/pgsql/entities/credential.entity'
import { Criteria } from '@/core/domain/types/criteria.type'
import { AuthType } from '@/domain/securities/types/auth.type'

@BindProvider(CredentialRepositoryOutboundPortSymbol)
export class CredentialRepository extends RepositoryBase<CredentialEntity> implements CredentialRepositoryOutboundPort {
  constructor(@InjectDataSource('pgsql') private readonly dataSource: DataSource) {
    super(CredentialEntity, dataSource.createEntityManager(), dataSource.createQueryRunner())
  }

  async login(props: AuthType.LoginOutput, relations?: string[]): Promise<Partial<CredentialEntity> | null> {
    try {
      const where: FindOptionsWhere<CredentialEntity> = {
        username: props.username,
        enable: true,
      }

      return await this.findOne({
        where,
        relations,
        withDeleted: false,
      })
    } catch (e: any) {
      this.logger.error(`Error in login: ${e.message}`, e.stack)
      throw e
    }
  }

  async findByUsername(props: { username: string }, relations?: string[]): Promise<Partial<CredentialEntity> | null> {
    try {
      const where: FindOptionsWhere<CredentialEntity> = {
        username: props.username,
        enable: true,
      }

      return await this.findOne({
        where,
        relations,
        withDeleted: false,
      })
    } catch (e: any) {
      this.logger.error(`Error in login: ${e.message}`, e.stack)
      throw e
    }
  }
}
