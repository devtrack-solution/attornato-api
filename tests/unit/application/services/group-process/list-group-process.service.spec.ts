import { Test, TestingModule } from '@nestjs/testing'
import { ListGroupProcessService } from '@/application/services/group-process/list-group-process.service'
import { GroupProcessRepositoryOutboundPort, GroupProcessRepositoryOutboundPortSymbol } from '@/domain/group-process/ports/outbound/group-process-repository.outbound-port'
import { GroupProcessTestBuilder } from '@tests/unit/application/services/group-process/group-process-test.builder'
import { mock } from 'jest-mock-extended'

describe('[APPLICATION] - ListGroupProcessService', () => {
  let service: ListGroupProcessService
  let groupProcessRepository: jest.Mocked<GroupProcessRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListGroupProcessService, { provide: GroupProcessRepositoryOutboundPortSymbol, useValue: mock<GroupProcessRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListGroupProcessService>(ListGroupProcessService)
    groupProcessRepository = module.get(GroupProcessRepositoryOutboundPortSymbol)
  })

  it('should return paginated machines', async () => {
    const criteria = GroupProcessTestBuilder.getPaginatedCriteria()
    const select = GroupProcessTestBuilder.getSelect()
    const searchFields = GroupProcessTestBuilder.getSearchFields()
    const order = GroupProcessTestBuilder.getOrder()
    const relations = GroupProcessTestBuilder.getRelationsCriteria()
    const mockResponse = GroupProcessTestBuilder.getRepositoryResponse()

    groupProcessRepository.findAllByCriteria.mockResolvedValue(mockResponse)

    const result = await service.execute(criteria)

    expect(result).toEqual(GroupProcessTestBuilder.getExpectedOutput())
    expect(groupProcessRepository.findAllByCriteria).toHaveBeenCalledWith(criteria, order, select, searchFields, relations)
    expect(groupProcessRepository.findAllByCriteria).toHaveBeenCalledTimes(1)
  })

  it('should return an empty list if no machines are found', async () => {
    const criteria = GroupProcessTestBuilder.getPaginatedCriteria()
    const select = GroupProcessTestBuilder.getSelect()
    const searchFields = GroupProcessTestBuilder.getSearchFields()
    const order = GroupProcessTestBuilder.getOrder()
    const relations = GroupProcessTestBuilder.getRelationsCriteria()
    const emptyResponse = GroupProcessTestBuilder.getEmptyResponse()

    groupProcessRepository.findAllByCriteria.mockResolvedValue(emptyResponse)

    const result = await service.execute(criteria)

    expect(result).toEqual(emptyResponse)
    expect(groupProcessRepository.findAllByCriteria).toHaveBeenCalledWith(criteria, order, select, searchFields, relations)
  })

  it('should throw an error if repository fails', async () => {
    const criteria = GroupProcessTestBuilder.getPaginatedCriteria()
    const select = GroupProcessTestBuilder.getSelect()
    const searchFields = GroupProcessTestBuilder.getSearchFields()
    const order = GroupProcessTestBuilder.getOrder()
    const relations = GroupProcessTestBuilder.getRelationsCriteria()

    groupProcessRepository.findAllByCriteria.mockRejectedValue(new Error('Database error'))

    await expect(service.execute(criteria)).rejects.toThrow('Database error')
    expect(groupProcessRepository.findAllByCriteria).toHaveBeenCalledWith(criteria, order, select, searchFields, relations)
  })
})
