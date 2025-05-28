import { expect, test, describe, it } from 'vitest'
import { inMemoryPetDataRepository } from '@/repository/in-memory/in-memory-pet-date-repository'
import { CreatePetDataUseCase } from './create-pet-data'

describe('user register use case', () => {
  it('should be able to register ', async () => {
    const PetDataRepository = new inMemoryPetDataRepository()
    const createPetDataUseCase = new CreatePetDataUseCase(PetDataRepository)

    const { pet } = await createPetDataUseCase.execute({
      id: 1,
      name: 'salvapet',
      size: 'tirol',
      photo: '30662090',
      race: '31 33826606',
      description: '123456',
      userId: '123456'
    })

    expect(pet.id).toEqual(expect.any(Number))
  })
})