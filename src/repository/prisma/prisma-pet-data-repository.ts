import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from '@prisma/client'

import { PetDataRepository } from '../pet-data-repository'

export class PrismaPetDataRepository implements PetDataRepository {
  async findPetById(id: number) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })
    return pet
  }

  async findManyPetsByUserId(userId: string) {
    const pets = await prisma.pet.findMany({
      where: {
        userId
      }
    })
    return pets
  }

  async findManyBySize(query: string) {
    const pet = await prisma.pet.findMany({
      where: {
        size: {
          contains: query
        }
      }
    })
    return pet
  }

  async findManyByDescription(query: string) {
    const pet = await prisma.pet.findMany({
      where: {
        photo: {
          contains: query
        }
      }
    })
    return pet
  }

  async findManyByRace(query: string) {
    const pet = await prisma.pet.findMany({
      where: {
        race: {
          contains: query
        }
      }
    })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }
}