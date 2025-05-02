import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectProceduralStatusService } from '@/application/services/process/component/procedural-status/list-to-select-procedural-status.service'
import { ProceduralStatusRepositoryOutboundPort, ProceduralStatusRepositoryOutboundPortSymbol } from '@/domain/process/component/procedural-status/ports/outbound/procedural-status-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ProceduralStatusTestBuilder } from '@tests/unit/application/services/procedural-status/procedural-status-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectProceduralStatusService', () => {
  let service: ListToSelectProceduralStatusService
  let proceduralStatusRepository: jest.Mocked<ProceduralStatusRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectProceduralStatusService, { provide: ProceduralStatusRepositoryOutboundPortSymbol, useValue: mock<ProceduralStatusRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectProceduralStatusService>(ListToSelectProceduralStatusService)
    proceduralStatusRepository = module.get(ProceduralStatusRepositoryOutboundPortSymbol)
  })

  it('should list proceduralStatuss successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const proceduralStatuss = [ProceduralStatusTestBuilder.getSuccess()]

    proceduralStatusRepository.findForSelectByCriteria.mockResolvedValue(proceduralStatuss)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(proceduralStatuss[0]))
  })
})
