import { Test, TestingModule } from '@nestjs/testing'
import { FreeFieldRepositoryOutboundPort, FreeFieldRepositoryOutboundPortSymbol } from '@/domain/client/component/person/contact-person/free-field/ports/outbound/free-field-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateFreeFieldService } from '@/application/services/client/component/person/contact-person/free-field/create-free-field.service'
import { FreeFieldTestBuilder } from '@tests/unit/application/services/free-field/free-field-test.builder'

describe('[APPLICATION] - CreateFreeFieldService', () => {
  let service: CreateFreeFieldService
  let freeFieldRepository: jest.Mocked<FreeFieldRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFreeFieldService, { provide: FreeFieldRepositoryOutboundPortSymbol, useValue: mock<FreeFieldRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateFreeFieldService>(CreateFreeFieldService)
    freeFieldRepository = module.get(FreeFieldRepositoryOutboundPortSymbol)
  })

  it('should create a freeField successfully', async () => {
    const inputData = FreeFieldTestBuilder.getSuccess()

    freeFieldRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(freeFieldRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name ?? ''))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([
    ['name is empty', FreeFieldTestBuilder.getFailOnEmptyName()],
  ])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
