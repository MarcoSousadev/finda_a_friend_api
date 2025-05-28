import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByPhone(phone: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  listUserIdByCity(query: string): Promise<{ id: string }[]>
} 