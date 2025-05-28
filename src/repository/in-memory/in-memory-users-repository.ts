import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { any } from 'zod'
import { randomUUID } from 'crypto'

interface Role {
  role: String
}

export class inMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async listUserIdByCity(city: string) {
    const user = this.items.filter(item => item.city.includes(city))

    return user
  }

  async findByPhone(phone: string) {
    const user = this.items.find(item => item.phone === phone)

    if (!user) {
      return null
    }
    return user
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      addres: data.addres,
      cep: data.cep,
      phone: data.phone,
      city: data.city,
      password_hash: data.password_hash
    }
    this.items.push(user)
    return user
  }
}