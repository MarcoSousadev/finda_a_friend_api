import { User, Prisma, PrismaClient } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { petDataRepository } from "../pet-data-repository";
import { Pet } from "generated/prisma";



export class InMemoryCreatePetDataRepository implements petDataRepository{
  public items:Pet[] = []

  
  async create(data: Prisma.PetCreateInput){
   
      const pet = {
          id: 1,
          userId: 'userId-1',
          name: data.name,
          size: data.size,
          race: data.race,
          description: data.description,
          photo: data.photo

        }
        this.items.push(pet)
      return pet
    }
 }