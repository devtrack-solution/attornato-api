import { Test, TestingModule } from '@nestjs/testing'
import { ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateProceduralStatusService } from '@/application/services/process/component/procedural-status/create-procedural-status.service'
import { ProceduralStatusTestBuilder } from '@tests/unit/application/services/procedural-status/procedural-status-test.builder'

describe('[APPLICATION] - CreateProceduralStatusService', () => {
  let service: CreateProceduralStatusService
  let proceduralStatusRepository: jest.Mocked<ProceduralStatusRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProceduralStatusService, { provide: ProceduralStatusRepositoryOutboundPortSymbol, useValue: mock<ProceduralStatusRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateProceduralStatusService>(CreateProceduralStatusService)
    proceduralStatusRepository = module.get(ProceduralStatusRepositoryOutboundPortSymbol)
  })

  it('should create a proceduralStatus successfully', async () => {
    const inputData = ProceduralStatusTestBuilder.getSuccess()

    proceduralStatusRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(proceduralStatusRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', ProceduralStatusTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
