import { userTable, InsertUser, SelectUser } from './../db/schema'
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { hashPass, comparePass, generateToken } from '../db/services/auth'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '../db'

export async function authRoutes(fastify: FastifyInstance) {
  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  fastify.post(
    '/register',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = userSchema.parse(request.body)

      try {
        const existingUser = await fastify.db
          .select()
          .from(userTable)
          .where(eq(userTable.email, email))
        if (existingUser.length > 0) {
          return reply.status(404).send({ error: 'User already exists' })
        }
        const hashedPassword = await hashPass(password)

        await db.insert(userTable).values({
          email,
          passwordHash: hashedPassword,
          username: email.split('@')[0],
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        reply.send({ message: 'User created sucessful' })
      } catch (error) {}
      reply.status(500).send({ error: 'Error register new User' })
    }
  )
}
