import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProfileType } from '@/domain/profile/types/profile.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListProfileInboundPortToken = Symbol.for('ListProfileInboundPortToken')

export interface ListProfileInboundPort extends IServiceWithCriteriaInboundPort<Criteria.Paginated, ProfileType.OutputPaginated> {}
