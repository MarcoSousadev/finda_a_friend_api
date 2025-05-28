import { User, Prisma, PrismaClient, Pet } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { PetDataRepository } from '../pet-data-repository'
import { number } from 'zod'

export class inMemoryPetDataRepository implements PetDataRepository {

  public items: Pet[] = []

  async findPetById(id: number) {
    return this.items.find(item => item.id === id) ?? null
  }

  async findManyPetsByUserId(userId: string): Promise<Pet[]> {
    return this.items.filter(item => item.userId.includes(userId))
  }

  async findManyBySize(query: string) {
  return this.items.filter(item => item.size.includes(query))
    
  }
  
   async findManyByDescription(query: string) {
      return this.items.filter(item => item.description.includes(query))
    }
  
    async findManyByRace(query: string) {
      return this.items.filter(item => item.race.includes(query))
    }
    

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: 1,
      userId: 'userId-1',
      name: data.name,
      size: data.size,
      race: data.race,
      description: data.description,
      photo: data.photo,
    }
    this.items.push(pet)
    return pet
  }
}
