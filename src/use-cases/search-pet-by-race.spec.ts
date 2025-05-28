import { expect, test, describe, it } from 'vitest'
import { inMemoryPetDataRepository } from '@/repository/in-memory/in-memory-pet-date-repository'
import { SearchPetDataByRaceUseCase } from './search-pet-by-race'

let petDataRepository: inMemoryPetDataRepository
let sut: SearchPetDataByRaceUseCase


describe('user register use case', ()=>{
  

it('should be able to search a pet by its description ', async ()=> {
     petDataRepository = new inMemoryPetDataRepository()
     sut = new SearchPetDataByRaceUseCase(petDataRepository)

   
    await petDataRepository.create({
      id: 1,
      name: 'Bob',
      size: 'small',
      photo: 'dhuadush.jpg',
      race: 'Shih Tzu',
      description: 'docilse',
      userId: '123456'
    })

    await petDataRepository.create({
      id: 2,
      name: 'Bob',
      size: 'small',
      photo: 'dhuadush.jpg',
      race: 'Shihs Tzu',
      description: 'docile',
      userId: '123456'
    })

    const { pet } = await sut.execute(
      {
        query:'Shih Tzu'
      }
    )

     expect(pet).toHaveLength(1)
     expect(pet).toEqual([
      expect.objectContaining({
        race: 'Shih Tzu'
      })
     ])
  })

})