import { Inject, Injectable } from '@nestjs/common'
import { CreateProfileInboundPort } from '@/domain/client/component/profile/ports/inbound/create-profile.inbound-port'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/component/profile/ports/outbound/profile-repository.outbound-port'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { Profile } from '@/domain/client/component/profile/business-objects/profile.bo'

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
