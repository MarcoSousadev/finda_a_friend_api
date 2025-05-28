import { Pet, Prisma } from '@prisma/client'

export interface PetDataRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyBySize(query: string): Promise<Pet[]>
  findManyByRace(query: string): Promise<Pet[]>
  findManyByDescription(query: string): Promise<Pet[]>
  findManyPetsByUserId(userId: string): Promise<Pet[]>
  findPetById(id: number): Promise<Pet | null>
}
