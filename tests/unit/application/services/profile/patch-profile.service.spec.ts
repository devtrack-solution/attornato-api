import { Test, TestingModule } from '@nestjs/testing'
import { PatchProfileService } from '@/application/services/profile/patch-profile.service'
import { ProfileRepositoryOutboundPort, ProfileRepositoryOutboundPortSymbol } from '@/domain/profile/ports/outbound/profile-repository.outbound-port'
import { mock } from 'jest-mock-extended'
import { ProfileTestBuilder } from '@tests/unit/application/services/profile/profile-test.builder'
import { Criteria } from '@/core/domain/types/criteria.type'
import { Profile } from '@/domain/profile/business-objects/profile.bo'

describe('[APPLICATION] - PatchProfileService', () => {
  let service: PatchProfileService
  let profileRepository: jest.Mocked<ProfileRepositoryOutboundPort>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatchProfileService, { provide: ProfileRepositoryOutboundPortSymbol, useValue: mock<ProfileRepositoryOutboundPort>() }],
    }).compile()

    service = module.get<PatchProfileService>(PatchProfileService)
    profileRepository = module.get(ProfileRepositoryOutboundPortSymbol)
  })

  it('should patch a profile successfully', async () => {
    const criteria: Criteria.ById = { id: 'valid-id' }
    const updatedData = ProfileTestBuilder.create().withName('UPDATED_NAME').build()
    const relations: string[] = []
    profileRepository.patchObject.mockResolvedValue(undefined)

    await service.execute(updatedData, criteria)

    expect(profileRepository.patchObject).toHaveBeenCalledWith(updatedData, criteria, Profile, relations)
  })
})
