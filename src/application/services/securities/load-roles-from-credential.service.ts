import { Inject, Injectable } from '@nestjs/common'
import { LoadRolesFromCredentialInboundPort } from '@/domain/securities/ports/inbound/load-roles-from-credential.inbound-port'
import { CredentialType } from '@/domain/securities/types/credential.type'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class LoadRolesFromCredentialService implements LoadRolesFromCredentialInboundPort {
  constructor(
    @Inject(CredentialRepositoryOutboundPortSymbol)
    private readonly credentialRepository: CredentialRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<CredentialType.Output> {
    return {} as CredentialType.Output
  }
}
