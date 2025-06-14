import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { DeleteProfileInboundPort } from '@/domain/client/component/profile/ports/inbound/delete-profile.inbound-port'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/component/profile/ports/outbound/profile-repository.outbound-port'

@Injectable()
export class DeleteProfileService implements DeleteProfileInboundPort {
  constructor(
    @Inject(ProfileRepositoryOutboundPortSymbol)
    private readonly profileRepository: ProfileRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.ById): Promise<void> {
    await this.profileRepository.deleteObject(criteria.id)
  }
}
