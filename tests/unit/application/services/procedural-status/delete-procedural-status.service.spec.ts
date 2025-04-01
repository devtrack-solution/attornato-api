import { Test, TestingModule } from '@nestjs/testing'
import { DeleteProceduralStatusService } from '@/application/services/procedural-status/delete-procedural-status.service'
import { ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteProceduralStatusService', () => {
  let service: DeleteProceduralStatusService
  let proceduralStatusRepository: jest.Mocked<ProceduralStatusRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProceduralStatusService, { provide: ProceduralStatusRepositoryOutboundPortSymbol, useValue: mock<ProceduralStatusRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteProceduralStatusService>(DeleteProceduralStatusService)
    proceduralStatusRepository = module.get(ProceduralStatusRepositoryOutboundPortSymbol)
  })

  it('should delete a proceduralStatus by ID', async () => {
    const criteria = { id: 'valid-id' }

    proceduralStatusRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(proceduralStatusRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if proceduralStatus does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    proceduralStatusRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
