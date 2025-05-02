import { Inject, Injectable } from '@nestjs/common'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ListToSelectProfileInboundPort } from '@/domain/client/component/profile/ports/inbound/list-to-select-profile.inbound-port'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/component/profile/ports/outbound/profile-repository.outbound-port'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { Profile } from '@/domain/client/component/profile/business-objects/profile.bo'

@Injectable()
export class ListToSelectProfileService implements ListToSelectProfileInboundPort {
  constructor(
    @Inject(ProfileRepositoryOutboundPortSymbol)
    private readonly profileRepository: ProfileRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.FindBy): Promise<Partial<ProfileType.Output[]>> {
    const select: string[] = ['id', 'name']
    const searchFields: string[] = ['name']
    const order = { name: 'ASC' }
    let  profile  = await this.profileRepository.findForSelectByCriteria(criteria, order, select, searchFields)
    return  profile .map(( profile ) => new Profile( profile  as ProfileType.Output).toJson())
  }
}
