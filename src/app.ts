import fastify from "fastify";

import { appRoutes } from "./http/routes";
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo: here we should log to an external tool like datadog/newrelic/sentry
  }

  return reply.status(500).send({ message: 'internal server error' })
})