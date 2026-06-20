import { CreateUserPayload } from '@traxd/types/'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import { prisma } from '../../db/index.js'
import { AppError } from '../../errors/index.js'
import { createUser, findUserByEmail, findUserById } from './user.repo.js'

const SALT_ROUNDS = 10
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string)
const JWT_EXPIRATION = '7d'

export const registerUser = async ({ email, name, password }: CreateUserPayload) => {
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) throw new AppError('User already exists', 409)

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  const newUser = await createUser({
    email,
    name,
    password: hashedPassword,
  })

  return { ...newUser, password: undefined }
}

export const loginUser = async (email: string, password: string) => {
  const existingUser = await findUserByEmail(email)
  if (!existingUser) throw new AppError('Invalid email or password', 401)
  
   const isPasswordValid = await bcrypt.compare(password, existingUser.password)
  if (!isPasswordValid) throw new AppError('Invalid email or password', 401)

  const token = await new SignJWT({ userId: existingUser.id, email: existingUser.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)

   return {
    existingUser: { ...existingUser, password: undefined },
    token,
   } 
}

export const getUserById = async (userId: string) => {
  const user = await findUserById(userId)
  if (!user) throw new AppError('User not found', 404)
  return { ...user, password: undefined }
}