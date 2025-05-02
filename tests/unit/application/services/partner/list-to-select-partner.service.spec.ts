import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectPartnerService } from '@/application/services/process/component/partner/list-to-select-partner.service'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/component/partner/ports/outbound/partner-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { PartnerTestBuilder } from '@tests/unit/application/services/partner/partner-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectPartnerService', () => {
  let service: ListToSelectPartnerService
  let partnerRepository: jest.Mocked<PartnerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectPartnerService, { provide: PartnerRepositoryOutboundPortSymbol, useValue: mock<PartnerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectPartnerService>(ListToSelectPartnerService)
    partnerRepository = module.get(PartnerRepositoryOutboundPortSymbol)
  })

  it('should list partners successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const partners = [PartnerTestBuilder.getSuccess()]

    partnerRepository.findForSelectByCriteria.mockResolvedValue(partners)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(partners[0]))
  })
})
