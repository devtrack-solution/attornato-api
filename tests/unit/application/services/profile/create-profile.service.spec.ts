import { Test, TestingModule } from '@nestjs/testing'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/client/component/profile/ports/outbound/profile-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { CreateProfileService } from '@/application/services/client/component/profile/create-profile.service'
import { ProfileTestBuilder } from '@tests/unit/application/services/profile/profile-test.builder'

describe('[APPLICATION] - CreateProfileService', () => {
  let service: CreateProfileService
  let profileRepository: jest.Mocked<ProfileRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProfileService, { provide: ProfileRepositoryOutboundPortSymbol, useValue: mock<ProfileRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<CreateProfileService>(CreateProfileService)
    profileRepository = module.get(ProfileRepositoryOutboundPortSymbol)
  })

  it('should create a profile successfully', async () => {
    const inputData = ProfileTestBuilder.getSuccess()

    profileRepository.saveObject.mockResolvedValue(undefined)

    const result = await service.execute(inputData)

    expect(profileRepository.saveObject).toHaveBeenCalledWith(expect.any(Object))
    expect(result.name).toEqual(expect.stringContaining(inputData.name ?? ''))
    expect(result).toEqual(expect.objectContaining(inputData))
  })

  it.each([['name is empty', ProfileTestBuilder.getFailOnEmptyName()]])('should fail when %s', async (_, inputData) => {
    await expect(service.execute(inputData)).rejects.toThrow()
  })
})
