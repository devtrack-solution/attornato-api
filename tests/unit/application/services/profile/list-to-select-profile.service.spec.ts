import { Test, TestingModule } from '@nestjs/testing'
import { ListToSelectProfileService } from '@/application/services/client/profile/list-to-select-profile.service'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/profile/ports/outbound/profile-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ProfileTestBuilder } from '@tests/unit/application/services/profile/profile-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'

describe('[APPLICATION] - ListToSelectProfileService', () => {
  let service: ListToSelectProfileService
  let profileRepository: jest.Mocked<ProfileRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListToSelectProfileService, { provide: ProfileRepositoryOutboundPortSymbol, useValue: mock<ProfileRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<ListToSelectProfileService>(ListToSelectProfileService)
    profileRepository = module.get(ProfileRepositoryOutboundPortSymbol)
  })

  it('should list profiles successfully', async () => {
    const criteria: Criteria.FindBy = { search: 'user_management' }
    const profiles = [ProfileTestBuilder.getSuccess()]

    profileRepository.findForSelectByCriteria.mockResolvedValue(profiles)

    const result = await service.execute(criteria)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expect.objectContaining(profiles[0]))
  })
})
