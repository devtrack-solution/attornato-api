import { Test, TestingModule } from '@nestjs/testing'
import { LocalProcedureNameRepositoryOutboundPort, LocalProcedureNameRepositoryOutboundPortSymbol } from '@/domain/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateLocalProcedureNameService } from '@/application/services/local-procedure-name/create-local-procedure-name.service'
import { LocalProcedureNameTestBuilder } from '@tests/unit/application/services/local-procedure-name/local-procedure-name-test.builder'

describe('[APPLICATION] - CreateLocalProcedureNameService', () => {
  let service: CreateLocalProcedureNameService
  let localProcedureNameRepository: jest.Mocked<LocalProcedureNameRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateLocalProcedureNameService, { provide: LocalProcedureNameRepositoryOutboundPortSymbol, useValue: mock<LocalProcedureNameRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateLocalProcedureNameService>(CreateLocalProcedureNameService)
    localProcedureNameRepository = module.get(LocalProcedureNameRepositoryOutboundPortSymbol)
  })

  it('should create a localProcedureName successfully', async () => {
    const inputData = LocalProcedureNameTestBuilder.getSuccess()

    localProcedureNameRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(localProcedureNameRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', LocalProcedureNameTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
