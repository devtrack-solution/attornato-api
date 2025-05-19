import { Inject, Injectable } from '@nestjs/common'
import { ListProfileInboundPort } from '@/domain/client/component/profile/ports/inbound/list-profile.inbound-port'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/component/profile/ports/outbound/profile-repository.outbound-port'
import { Profile } from '@/domain/client/component/profile/business-objects/profile.bo'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { Criteria } from '@/core/domain/types/criteria.type'

@Injectable()
export class ListProfileService implements ListProfileInboundPort {
  constructor(
    @Inject(ProfileRepositoryOutboundPortSymbol)
    private readonly profileRepository: ProfileRepositoryOutboundPort,
  ) {}

  async execute(criteria: Criteria.Paginated): Promise<ProfileType.OutputPaginated> {
    // const select: string[] = ['id', 'name', 'status', 'createdAt']
    const select: string[] = []
    const relations: string[] = []
    const searchFields: string[] = ['name']
    const order = { createdAt: 'ASC' }
    let result = await this.profileRepository.findAllByCriteria(criteria, order, select, searchFields, relations)
    let profile = result.data.map((profile) => profile as ProfileType.Output)
    return {
      count: result.count,
      limit: result.limit,
      offset: result.offset,
      data: profile,
    }
  }
}
