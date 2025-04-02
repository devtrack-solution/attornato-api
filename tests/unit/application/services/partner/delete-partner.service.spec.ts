import { Test, TestingModule } from '@nestjs/testing'
import { DeletePartnerService } from '@/application/services/partner/delete-partner.service'
import { PartnerRepositoryOutboundPort, PartnerRepositoryOutboundPortSymbol } from '@/domain/partner/ports/outbound/partner-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeletePartnerService', () => {
  let service: DeletePartnerService
  let partnerRepository: jest.Mocked<PartnerRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePartnerService, { provide: PartnerRepositoryOutboundPortSymbol, useValue: mock<PartnerRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeletePartnerService>(DeletePartnerService)
    partnerRepository = module.get(PartnerRepositoryOutboundPortSymbol)
  })

  it('should delete a partner by ID', async () => {
    const criteria = { id: 'valid-id' }

    partnerRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(partnerRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if partner does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    partnerRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
