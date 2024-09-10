import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../../env'

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
