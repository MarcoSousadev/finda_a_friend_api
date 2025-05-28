import { FastifyInstance } from "fastify";
import { userRegister } from "./controllers/user-register";
import { petsInfo } from './controllers/pets-info'
import { orgInfo } from './controllers/org-info'

export async function appRoutes (app:FastifyInstance)  {
  app.post('/users', userRegister)
  app.get('/me', orgInfo)
  app.get('/me/pets', petsInfo)
}