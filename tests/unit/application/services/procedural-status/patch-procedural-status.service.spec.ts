import { Test, TestingModule } from '@nestjs/testing'
import { PatchProceduralStatusService } from '@/application/services/process/component/procedural-status/patch-procedural-status.service'
import { ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ProceduralStatusTestBuilder } from '@tests/unit/application/services/procedural-status/procedural-status-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { ProceduralStatus } from '@/domain/process/component/procedural-status/business-objects/procedural-status.bo'

describe('[APPLICATION] - PatchProceduralStatusService', () => {
  let service: PatchProceduralStatusService
  let proceduralStatusRepository: jest.Mocked<ProceduralStatusRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchProceduralStatusService, { provide: ProceduralStatusRepositoryOutboundPortSymbol, useValue: mock<ProceduralStatusRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchProceduralStatusService>(PatchProceduralStatusService)
    proceduralStatusRepository = module.get(ProceduralStatusRepositoryOutboundPortSymbol)
  })

  it('should patch a proceduralStatus successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = ProceduralStatusTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    proceduralStatusRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(proceduralStatusRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, ProceduralStatus, relations)
  })
})
