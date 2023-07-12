import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  course: z.string(),
  users: z.array(
    z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        group: z.string(),
        role: z.string(),
        created: z.string()
    })
  )
})

export type GroupListItem = z.infer<typeof groupSchema>
