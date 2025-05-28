import { Pet, Prisma } from '@prisma/client'
import { PetDataRepository } from '@/repository/pet-data-repository'

interface PetDataByIdUseCaseRequest {
  id: number
}

interface PetDataByIdUseCaseResponse {
 pet: Pet | null
}


export class SearchPetDataByIdUseCase {
  constructor(private petDataRepository: PetDataRepository) {}


  async execute({ id }:PetDataByIdUseCaseRequest): Promise<PetDataByIdUseCaseResponse> {
 
   
    const pet = await this.petDataRepository.findPetById(id)
    
    return {
      pet
    }
    
  }
}
