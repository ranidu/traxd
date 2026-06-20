import { CreateUserPayload } from '@traxd/types/'
import { prisma } from '../../db/index.js'

export const createUser = async (user: CreateUserPayload) => {
  const { email, name, password} = user
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  })
  return newUser
}

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return user
}

export const findUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  return user
}