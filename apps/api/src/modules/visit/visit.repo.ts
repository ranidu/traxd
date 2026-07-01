import { prisma } from '../../db/index.js'

export const findAll = async() => {
    const resp = await prisma.visit.findMany()
    return resp
}