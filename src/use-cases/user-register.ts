import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repository/prisma-users-repository";
import { hash } from "bcryptjs"

interface userRegisterUseCaseRequest {
  name: string;
  addres: string;
  cep: string ;
  phone: string;
  password: string;
  city: string;
}

export async function userRegisterUseCase({
  name,
  addres,
  cep,
  phone,
  password,
  city

}:userRegisterUseCaseRequest) {

  const password_hash = await hash(password, 6)

  const userIfSamePhone = await prisma.user.findUnique({
    where: {
      phone
    }
  })

  if (userIfSamePhone) {
    throw new Error('E-mail alredy exists')
  }

  const prismaUsersRepository = new PrismaUsersRepository()
 
  await prismaUsersRepository.create({
    name,
    addres,
    cep,
    phone,
    password_hash,
    city,
  })
}