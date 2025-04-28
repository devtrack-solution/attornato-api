import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { ProfileType } from '@/domain/client/profile/types/profile.type'

export const CreateProfileInboundPortToken = Symbol.for('CreateProfileInboundPortToken')

export interface CreateProfileInboundPort extends IServiceWithDataInboundPort<ProfileType.Input, undefined, ProfileType.Output> {}
