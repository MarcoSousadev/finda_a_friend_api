import { Pet, Prisma, User } from "@prisma/client";

export interface petDataRepository{
  create(data:Prisma.PetUncheckedCreateInput): Promise<Pet> 
} 