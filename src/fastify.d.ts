import { FastifyInstance } from 'fastify'
import type { drizzle } from 'drizzle-orm/postgres-js'

//Para tratar novo tipo em FastifyInstance...
declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof drizzle>
  }
}
