import { Pet, Prisma } from '@prisma/client'
import { PetDataRepository } from '@/repository/pet-data-repository'

interface PetDataByDescriptionUseCaseRequest {
  query: string
}

interface PetDataByDescriptionUseCaseResponse {
 pet: Pet[]
}


export class SearchPetDataByDescriptionUseCase {
  constructor(private petDataRepository: PetDataRepository) {}


  async execute({query}:PetDataByDescriptionUseCaseRequest): Promise<PetDataByDescriptionUseCaseResponse> {
 
   
    const pet = await this.petDataRepository.findManyByDescription(query)
    
    return {
      pet
    }
    
  }
}
