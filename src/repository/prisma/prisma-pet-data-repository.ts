import { prisma } from "@/lib/prisma";
import {Prisma} from '@prisma/client'

import { petDataRepository } from "../pet-data-repository";


export class PrismaPetDataRepository implements petDataRepository{
    findByCharacteristcs(race: string, size: string, photo: string){
      const pet =  prisma.pet.findMany({
        where:{
          race,
          photo,
          size
        }
      })
      return pet
    }
      
    create(data:Prisma.PetUncheckedCreateInput){
        const pet = prisma.pet.create({
          data
        })

        return pet
      } 
}