import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectLocalProcedureNameService } from '@/application/services/process/component/local-procedure-name/list-to-select-local-procedure-name.service'
import { LocalProcedureNameRepositoryOutboundPort, LocalProcedureNameRepositoryOutboundPortSymbol } from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LocalProcedureNameTestBuilder } from '@tests/unit/application/services/local-procedure-name/local-procedure-name-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectLocalProcedureNameService', () => {
  let service: ListToSelectLocalProcedureNameService
  let localProcedureNameRepository: jest.Mocked<LocalProcedureNameRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectLocalProcedureNameService, { provide: LocalProcedureNameRepositoryOutboundPortSymbol, useValue: mock<LocalProcedureNameRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectLocalProcedureNameService>(ListToSelectLocalProcedureNameService)
    localProcedureNameRepository = module.get(LocalProcedureNameRepositoryOutboundPortSymbol)
  })

  it('should list localProcedureNames successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const localProcedureNames = [LocalProcedureNameTestBuilder.getSuccess()]

    localProcedureNameRepository.findForSelectByCriteria.mockResolvedValue(localProcedureNames)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(localProcedureNames[0]))
  })
})
