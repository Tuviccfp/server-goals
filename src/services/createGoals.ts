import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalsRequest {
  title: string
  desiredWeeklyFrequency: number
  userId: string
}

export async function createGoals({
  title,
  desiredWeeklyFrequency,
  userId,
}: CreateGoalsRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
      userId: userId,
    })
    .returning()
  const goal = result[0]

  return {
    goal,
  }
}
