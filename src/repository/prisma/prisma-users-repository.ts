import { prisma } from "@/lib/prisma";
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async listUserIdByCity(query: string) {
    const user = await prisma.user.findMany({
      where: {
        city: {
          contains: query
        }
      },
      select: {
        id: true
      }
    })
    return user
  }

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
