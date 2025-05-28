import { Pet, Prisma } from '@prisma/client'
import { PetDataRepository } from '@/repository/pet-data-repository'

interface CreatePetDataUseCaseRequest {
  id?: number
  name: string
  race: string
  size: string
  photo: string
  description: string
  userId: string
}

interface CreatePetDataUseCaseResponse {
  pet: Pet
}


export class CreatePetDataUseCase {
  constructor(private petDataRepository: PetDataRepository) {}
  async execute({
    name,
    race,
    size,
    photo,
    description,
    userId
  }: CreatePetDataUseCaseRequest): Promise<CreatePetDataUseCaseResponse> {
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
