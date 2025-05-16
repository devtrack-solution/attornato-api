import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchCredentialInboundPort } from '@/domain/securities/ports/inbound/patch-credential.inbound-port'
import { CredentialRepositoryOutboundPort, CredentialRepositoryOutboundPortSymbol } from '@/domain/securities/ports/outbound/credential-repository.outbound-port'
import { CredentialType } from '@/domain/securities/types/credential.type'

@Injectable()
export class PatchCredentialService implements PatchCredentialInboundPort {
  constructor(
    @Inject(CredentialRepositoryOutboundPortSymbol)
    private readonly credentialRepository: CredentialRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<CredentialType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.credentialRepository.patchObject(data, criteria, Credential, relations)
  }
}
