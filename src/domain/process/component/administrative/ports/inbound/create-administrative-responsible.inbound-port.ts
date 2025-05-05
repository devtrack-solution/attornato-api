import { IServiceWithDataInboundPort } from '@/core/domain/ports/inbound/service.inbound-port'
import { AdministrativeType } from '../../types/administrative.type'

export const CreateAdministrativeInboundPortToken = Symbol.for('CreateAdministrativeInboundPortToken')

export interface CreateAdministrativeInboundPort extends IServiceWithDataInboundPort<AdministrativeType.Input, undefined, AdministrativeType.Output> {}
