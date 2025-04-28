import { Test, TestingModule } from '@nestjs/testing'
import { DeleteLocalProcedureNameService } from '@/application/services/process/local-procedure-name/delete-local-procedure-name.service'
import { LocalProcedureNameRepositoryOutboundPort, LocalProcedureNameRepositoryOutboundPortSymbol } from '@/domain/process/local-procedure-name/ports/outbound/local-procedure-name-repository.outbound-port'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - DeleteLocalProcedureNameService', () => {
  let service: DeleteLocalProcedureNameService
  let localProcedureNameRepository: jest.Mocked<LocalProcedureNameRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteLocalProcedureNameService, { provide: LocalProcedureNameRepositoryOutboundPortSymbol, useValue: mock<LocalProcedureNameRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<DeleteLocalProcedureNameService>(DeleteLocalProcedureNameService)
    localProcedureNameRepository = module.get(LocalProcedureNameRepositoryOutboundPortSymbol)
  })

  it('should delete a localProcedureName by ID', async () => {
    const criteria = { id: 'valid-id' }

    localProcedureNameRepository.deleteObject.mockResolvedValue(undefined)

    await service.execute(criteria)

    expect(localProcedureNameRepository.deleteObject).toHaveBeenCalledWith(criteria.id)
  })

  it('should throw an error if localProcedureName does not exist', async () => {
    const criteria = { id: 'non-existing-id' }

    localProcedureNameRepository.deleteObject.mockRejectedValue(new Error('Not Found'))

    await expect(service.execute(criteria)).rejects.toThrow('Not Found')
  })
})
