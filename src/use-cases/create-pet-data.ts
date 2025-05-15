import { Pet, Prisma } from '@prisma/client'
import { petDataRepository } from '@/repository/pet-data-repository'

interface createPetDataUseCaseRequest {
  id?: number
  name: string
  race: string
  size: string
  photo: string
  description: string
  userId:string
}

interface createPetDataUseCaseResponse {
  pet: Pet
}


export class CreatePetDataUseCase {
  constructor(private petDataRepository: petDataRepository) {}
  async execute({
    name,
    race,
    size,
    photo,
    description,
    userId,
   
  
  }: createPetDataUseCaseRequest) 
  
  
  {
   

    
    const pet = await this.petDataRepository.create({
      
      name,
      race,
      size,
      photo,
      description,
      userId
    })

    return {
      pet
    }
  }
}
