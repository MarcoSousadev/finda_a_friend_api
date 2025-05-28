import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { UserAlredyExistsError } from '@/use-cases/erros/user-already-exists'
import { UserRegisterUsecase } from '@/use-cases/user-register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petsInfo(
  request: FastifyRequest,
  reply: FastifyReply
) {}
