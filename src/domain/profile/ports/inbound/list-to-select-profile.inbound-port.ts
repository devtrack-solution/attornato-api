import { IServiceWithCriteriaInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProfileType } from '@/domain/profile/types/profile.type'
import { Criteria } from '@/core/domain/types/criteria.type'

export const ListToSelectProfileInboundPortToken = Symbol.for('ListToSelectProfileInboundPortToken')

export interface ListToSelectProfileInboundPort extends IServiceWithCriteriaInboundPort<Criteria.FindBy, Partial<ProfileType.Output[]>> {}
