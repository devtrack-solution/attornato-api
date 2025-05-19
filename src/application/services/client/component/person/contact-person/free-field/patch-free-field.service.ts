import { Inject, Injectable } from '@nestjs/common'

import { Criteria } from '@/core/domain/types/criteria.type'
import { FreeFieldType } from '@/domain/client/component/person/contact-person/free-field/types/free-field.type'
import { PatchFreeFieldInboundPort } from '@/domain/client/component/person/contact-person/free-field/ports/inbound/patch-free-field.inbound-port'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { FreeField } from '@/domain/client/component/person/contact-person/free-field/business-objects/free-field.bo'

@Injectable()
export class PatchFreeFieldService implements PatchFreeFieldInboundPort {
  constructor(
    @Inject(FreeFieldRepositoryOutboundPortSymbol)
    private readonly freeFieldRepository: FreeFieldRepositoryOutboundPort,
  ) {}

  async execute(data: Partial<FreeFieldType.Input>, criteria: Criteria.ById): Promise<void> {
    const relations: string[] = []
    await this.freeFieldRepository.patchObject(data, criteria, FreeField, relations)
  }
}
