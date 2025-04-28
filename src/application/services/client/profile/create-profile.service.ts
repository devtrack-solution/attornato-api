import { Inject, Injectable } from '@nestjs/common'
import { CreateProfileInboundPort } from '@/domain/client/profile/ports/inbound/create-profile.inbound-port'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/profile/ports/outbound/profile-repository.outbound-port'
import { ProfileType } from '@/domain/client/profile/types/profile.type'
import { Profile } from '@/domain/client/profile/business-objects/profile.bo'

@Injectable()
export class CreateProfileService implements CreateProfileInboundPort {
  constructor(
    @Inject(ProfileRepositoryOutboundPortSymbol)
    private readonly profileRepository: ProfileRepositoryOutboundPort,
  ) {}

  async execute(data: ProfileType.Input): Promise<ProfileType.Output> {
    let  profile  = new Profile(data)
    await this.profileRepository.saveObject( profile .toPersistence())
    return  profile .toJson()
  }
}
