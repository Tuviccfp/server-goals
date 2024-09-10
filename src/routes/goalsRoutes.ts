import { goals } from '../db/schema'
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { createGoals } from '../services/createGoals'
import { authenticate } from '../db/services/auth'

export async function goalsRoutes(fastify: FastifyInstance) {
  const goalSchema = z.object({
    title: z.string().min(3).max(100),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  })

  fastify.post(
    '/create-goals',
    { preHandler: [authenticate] },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = goalSchema.parse(request.body)
      const userId = request.user?.id
      try {
        if (!userId) {
          return reply.status(404).send({ messager: 'User ID is missing' })
        }
        await createGoals({
          title: body.title,
          desiredWeeklyFrequency: body.desiredWeeklyFrequency,
          userId: userId,
        })

        console.log(authenticate, 'linha 26')
        reply.status(201).send({ message: 'Goals created successfully' })
      } catch (error) {
        reply
          .status(500)
          .send({ error: 'Error creating goals', message: error })
        console.log(error)
      }
    }
  )
}
