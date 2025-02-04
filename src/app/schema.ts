import { z } from "zod"
 
export const formSchema = z.object({
  email: z.string().min(2).max(255),
  password: z.string().min(4)
})

export type FormData = z.infer<typeof formSchema>