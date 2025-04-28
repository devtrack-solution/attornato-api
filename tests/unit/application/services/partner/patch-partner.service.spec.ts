import { Test, TestingModule } from '@nestjs/testing'
import { PatchPartnerService } from '@/application/services/process/partner/patch-partner.service'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/partner/ports/outbound/partner-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PartnerTestBuilder } from '@tests/unit/application/services/partner/partner-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Partner } from '@/domain/process/partner/business-objects/partner.bo'

describe('[APPLICATION] - PatchPartnerService', () => {
  let service: PatchPartnerService
  let partnerRepository: jest.Mocked<PartnerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchPartnerService, { provide: PartnerRepositoryOutboundPortSymbol, useValue: mock<PartnerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchPartnerService>(PatchPartnerService)
    partnerRepository = module.get(PartnerRepositoryOutboundPortSymbol)
  })

  it('should patch a partner successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = PartnerTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    partnerRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(partnerRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Partner, relations)
  })
})
