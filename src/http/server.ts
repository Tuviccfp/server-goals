import fastify from 'fastify'
import { db } from '../db'
import { authRoutes } from '../routes/authRoutes'
import { verifyToken } from '../db/services/auth'

const app = fastify()

app.decorate('db', db)
app.register(authRoutes)

app
  .listen({ port: 3333 })
  .then(() => {
    console.log('Server is running on port 3333')
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
