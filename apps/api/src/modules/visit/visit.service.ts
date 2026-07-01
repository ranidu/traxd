import { findAll } from './visit.repo.js'

export const listVisits = async() => {
    return await findAll()
}