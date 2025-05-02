import { Test, TestingModule } from '@nestjs/testing'
import { DeletePrognosisService } from '@/application/services/process/component/prognosis/delete-prognosis.service'
import { PrognosisRepositoryOutboundPort, PrognosisRepositoryOutboundPortSymbol } from '@/domain/process/component/prognosis/ports/outbound/prognosis-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeletePrognosisService', () => {
  let service: DeletePrognosisService
  let prognosisRepository: jest.Mocked<PrognosisRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletePrognosisService, { provide: PrognosisRepositoryOutboundPortSymbol, useValue: mock<PrognosisRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeletePrognosisService>(DeletePrognosisService)
    prognosisRepository = module.get(PrognosisRepositoryOutboundPortSymbol)
  })

  it('should delete a prognosis by ID', async () => {
    const criteria = { id: 'valid-id' }

    prognosisRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(prognosisRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if prognosis does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    prognosisRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
