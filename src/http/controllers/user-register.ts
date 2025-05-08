import { prisma } from '@/lib/prisma'
import {FastifyReply, FastifyRequest} from 'fastify'
import { z } from 'zod'



export async function userRegister (request: FastifyRequest, reply:FastifyReply)
{
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.string(),
    city: z.string(),
    phone: z.string()

  })

  const { name, password, address, cep, city, phone } = registerBodySchema.parse(request.body)


  await prisma.user.create({
    data: {
      name,
      addres: address,
      cep,
      phone,
      password_hash: password,
      city
      
    }
  })
  return reply.status(201).send({message : "Created User"})
} 