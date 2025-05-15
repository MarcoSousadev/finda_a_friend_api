import { prisma } from "@/lib/prisma";
import {Prisma} from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByPhone(phone: string) {
    const user = await prisma.user.findUnique({
      where: {
        phone
      }
    })

    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }
} 
