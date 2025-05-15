import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository{
  public items:User[] = []

  async findByPhone(phone: string) {
    const user = this.items.find((item) => item.phone === phone)

    if (!user) {
      return null
    }
    return user
  }
  async create(data: Prisma.UserCreateInput){
   
      const user = {
          id: 'user-1',
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