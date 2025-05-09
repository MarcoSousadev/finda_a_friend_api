import { prisma } from '@/lib/prisma'
import { userRegisterUseCase } from '@/use-cases/user-register'
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
    await userRegisterUseCase({
      name,
      password,
      addres,
      cep,
      city,
      phone
    })
  } catch (err) {
    return reply.status(409).send()
  }
  return reply.status(200).send()
} 