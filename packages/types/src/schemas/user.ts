import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  password: z.string().min(8),
  reTypePassword: z.string().min(8),  
})