import { IServiceInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProfileType } from '@/domain/client/component/profile/types/profile.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const PatchProfileInboundPortToken = Symbol.for('PatchProfileInboundPortToken')

export interface PatchProfileInboundPort extends IServiceInboundPort<Partial<ProfileType.Input>, Criteria.ById, void> {}
