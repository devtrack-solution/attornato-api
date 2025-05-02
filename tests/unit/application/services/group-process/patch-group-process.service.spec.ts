import { Test, TestingModule } from '@nestjs/testing'
import { PatchGroupProcessService } from '@/application/services/process/component/group-process/patch-group-process.service'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/process/component/group-process/ports/outbound/group-process-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { GroupProcessTestBuilder } from '@tests/unit/application/services/group-process/group-process-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { GroupProcess } from '@/domain/process/component/group-process/business-objects/group-process.bo'

describe('[APPLICATION] - PatchGroupProcessService', () => {
  let service: PatchGroupProcessService
  let groupProcessRepository: jest.Mocked<GroupProcessRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchGroupProcessService, { provide: GroupProcessRepositoryOutboundPortSymbol, useValue: mock<GroupProcessRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchGroupProcessService>(PatchGroupProcessService)
    groupProcessRepository = module.get(GroupProcessRepositoryOutboundPortSymbol)
  })

  it('should patch a groupProcess successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = GroupProcessTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    groupProcessRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(groupProcessRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, GroupProcess, relations)
  })
})
