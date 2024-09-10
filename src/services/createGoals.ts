import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalsRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoals({
  title,
  desiredWeeklyFrequency,
}: CreateGoalsRequest) {
  return await db
    .insert(goals)
    .values([{ title, desiredWeeklyFrequency }])
    .returning()
}
