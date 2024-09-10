import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../../env'
import type { FastifyRequest, FastifyReply } from 'fastify'

export const hashPass = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export const comparePass = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, env.JWT_SECRET as string, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET as string)
  } catch (err) {
    return new Error('Invalid token')
  }
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader?.startsWith('Bearer ') || !authHeader) {
      return reply.status(401).send({ error: 'Invalid token authorization' })
    }
    console.log(authHeader, 'linha 40')
    const token = authHeader.split(' ')[1]
    console.log(token, 'linha 42')
    const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
      id: string
    }

    request.user = { id: decoded.id }
  } catch (error) {
    reply.status(401).send({ error: 'Invalid token', message: error })
  }
}
