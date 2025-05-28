import { Pet, Prisma } from '@prisma/client'
import { PetDataRepository } from '@/repository/pet-data-repository'

interface PetDataByRaceUseCaseRequest {
  query: string
}

interface PetDataByRaceUseCaseResponse {
 pet: Pet[]
}


export class SearchPetDataByRaceUseCase {
  constructor(private petDataRepository: PetDataRepository) {}


  async execute({query}:PetDataByRaceUseCaseRequest): Promise<PetDataByRaceUseCaseResponse> {
 
   
    const pet = await this.petDataRepository.findManyByRace(query)
    
    return {
      pet
    }
    
  }
}
