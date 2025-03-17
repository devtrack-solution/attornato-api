import { Test, TestingModule } from '@nestjs/testing'
import { mock } from 'jest-mock-extended'
import { PatchGroupProcessService } from '@/application/services/group-process/patch-group-process.service'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'
import { Criteria } from '@/core/domain/types/criteria.type'
import { GroupProcessTestBuilder } from './group-process-test.builder'

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
    const updatedData = GroupProcessTestBuilder.create().withName('UPDATED_MACHINE_NAME').build()

    groupProcessRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(groupProcessRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria)
  })
})
