import { client, db } from '.'
import { goals, goalsCompletions } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalsCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Estudar', desiredWeeklyFrequency: 5 },
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5 },
      { title: 'Fazer exercício', desiredWeeklyFrequency: 3 },
    ])
    .returning()
  const starOfWeek = dayjs().endOf('week')

  await db
    .insert(goalsCompletions)
    .values([{ goalId: result[0].id, createdAt: starOfWeek.toDate() }])
}

seed().finally(() => {
  client.end()
})
