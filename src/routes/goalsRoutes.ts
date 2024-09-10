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
      const { title, desiredWeeklyFrequency } = goalSchema.parse(request.body)
      try {
        await createGoals({
          title,
          desiredWeeklyFrequency,
        })
        reply.status(201).send({ message: 'Goals created successfully' })
      } catch (error) {
        reply.status(500).send({ error: 'Error creating goals' })
      }
    }
  )
}
