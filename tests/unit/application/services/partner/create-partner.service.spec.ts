import { Test, TestingModule } from '@nestjs/testing'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/process/component/partner/ports/outbound/partner-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreatePartnerService } from '@/application/services/process/component/partner/create-partner.service'
import { PartnerTestBuilder } from '@tests/unit/application/services/partner/partner-test.builder'

describe('[APPLICATION] - CreatePartnerService', () => {
  let service: CreatePartnerService
  let partnerRepository: jest.Mocked<PartnerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePartnerService, { provide: PartnerRepositoryOutboundPortSymbol, useValue: mock<PartnerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreatePartnerService>(CreatePartnerService)
    partnerRepository = module.get(PartnerRepositoryOutboundPortSymbol)
  })

  it('should create a partner successfully', async () => {
    const inputData = PartnerTestBuilder.getSuccess()

    partnerRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(partnerRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([['name is empty', PartnerTestBuilder.getFailOnEmptyName()]])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
