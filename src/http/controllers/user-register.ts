import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { UserAlredyExistsError } from '@/use-cases/erros/user-already-exists'
import { UserRegisterUsecase } from '@/use-cases/user-register'
import { hash } from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    addres: z.string(),
    cep: z.string(),
    city: z.string(),
    phone: z.string()
  })

  const { name, password, addres, cep, city, phone } = registerBodySchema.parse(
    request.body
  )

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const userRegisterUseCase = new UserRegisterUsecase(prismaUsersRepository)

    await userRegisterUseCase.execute({
      name,
      password,
      addres,
      cep,
      city,
      phone
    })
  } catch (err) {
    if (err instanceof UserAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
  return reply.status(200).send()
} 