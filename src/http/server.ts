import fastify from 'fastify'
import { db } from '../db'
import { authRoutes } from '../routes/authRoutes'
import { goalsRoutes } from '../routes/goalsRoutes'

const app = fastify()

app.decorate('db', db)
app.register(authRoutes)
app.register(goalsRoutes)

app
  .listen({ port: 3333 })
  .then(() => {
    console.log('Server is running on port 3333')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
