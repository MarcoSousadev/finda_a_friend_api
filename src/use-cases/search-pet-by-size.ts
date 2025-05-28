import { Pet, Prisma } from '@prisma/client'
import { PetDataRepository } from '@/repository/pet-data-repository'

interface PetDataBySizeUseCaseRequest {
  query: string
}

interface PetDataBySizeUseCaseResponse {
 pet: Pet[]
}


export class SearchPetDataBySizeUseCase {
  constructor(private petDataRepository: PetDataRepository) {}


  async execute({query}:PetDataBySizeUseCaseRequest): Promise<PetDataBySizeUseCaseResponse> {
 
   
    const pet = await this.petDataRepository.findManyBySize(query)
    
    return {
      pet
    }
    
  }
}
