import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { PatchProfileInboundPort } from '@/domain/client/profile/ports/inbound/patch-profile.inbound-port'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/profile/ports/outbound/profile-repository.outbound-port'
import { ProfileType } from '@/domain/client/profile/types/profile.type'
import { Profile } from '@/domain/client/profile/business-objects/profile.bo'

@Injectable()
export class PatchProfileService implements PatchProfileInboundPort {
  constructor(
    @Inject(ProfileRepositoryOutboundPortSymbol)
    private readonly profileRepository: ProfileRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<ProfileType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.profileRepository.patchObject(data, criteria, Profile, relations)
  }
}
