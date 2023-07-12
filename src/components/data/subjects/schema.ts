import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  acronim: z.string(),
})

export type SubjectListItem = z.infer<typeof subjectSchema>
