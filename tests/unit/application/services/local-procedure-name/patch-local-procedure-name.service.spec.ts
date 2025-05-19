import { Test, TestingModule } from '@nestjs/testing'
import { PatchLocalProcedureNameService } from '@/application/services/process/component/local-procedure-name/patch-local-procedure-name.service'
import {
  LocalProcedureNameRepositoryOutboundPort,
  LocalProcedureNameRepositoryOutboundPortSymbol,
} from '@/domain/process/component/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { LocalProcedureNameTestBuilder } from '@tests/unit/application/services/local-procedure-name/local-procedure-name-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { LocalProcedureName } from '@/domain/process/component/local-procedure-name/business-objects/local-procedure-name.bo'

describe('[APPLICATION] - PatchLocalProcedureNameService', () => {
  let service: PatchLocalProcedureNameService
  let localProcedureNameRepository: jest.Mocked<LocalProcedureNameRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchLocalProcedureNameService, { provide: LocalProcedureNameRepositoryOutboundPortSymbol, useValue: mock<LocalProcedureNameRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchLocalProcedureNameService>(PatchLocalProcedureNameService)
    localProcedureNameRepository = module.get(LocalProcedureNameRepositoryOutboundPortSymbol)
  })

  it('should patch a localProcedureName successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = LocalProcedureNameTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    localProcedureNameRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(localProcedureNameRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, LocalProcedureName, relations)
  })
})
